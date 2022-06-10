const express = require("express")
const app = express()
const router = express.Router()
const multer = require("multer")
const bodyParser = require('body-parser')
const path = require('path')
const File = require('../models/file')
const { sendFileMail } = require('../services/emailService')

app.use(bodyParser.urlencoded(
  { extended:true }
))

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname.substring(0, file.originalname.length-4)}_${Math.round(Math.random() * 1E6)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
})

let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 100 },
}).single('myImage');

router.get("/",(req, res) => {
  res.render('home')
})
router.post("/", (req, res) => {
    // Store file
    upload(req, res, async (err) => {
      //  console.log(req.file)
        // validate request
        if (!req.file) {
          return res.status(400).send({ error: "Must select one file!" });
        }
        if(err) {
            return res.status(500).send({error: err.message})
        }

        // Store file to database
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size 
        })
        const response = await file.save()
        return res.redirect(`/file/${file._id}`)
        // return res.send({ 
        //   File: file,
        //   Link: `http://localhost:3200/files/${response._id}`
        // })
    })
});

// email sent route
router.post('/email', async (req, res) => {
  const { _id, emailTo, emailFrom } = req.body

  if(!_id || !emailTo || !emailFrom) {
    return res.status(422).send({ error: "All fields are required!"})
  }

  // Get data from database
  const file = await File.findById(_id)
  if(file.sender) {
    return res.status(422).send({ error: "Email already sent!"})
  }

  // send mail
  await sendFileMail({ 
    from: emailFrom, 
    to: emailTo,
    subject: 'File Sharing',
    text: `${emailFrom} shared file with you.`,
    html: require('../services/emailTemplate')({
      emailFrom: emailFrom,
      download: `http://localhost:3200/files/${file._id}`,
      size: parseInt(file.size/1000000) + ' MB',
      expires: "24 hours"
    })
  });
  file.sender = emailFrom
  file.receiver = emailTo
  const  response = await file.save()
  return res.send({ succes: true})
})

module.exports = router;

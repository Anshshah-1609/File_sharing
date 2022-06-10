const router = require('express').Router()
const File = require('../models/file')

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const file = await File.findById(id)
        if(!file) {
            return res.status(404).render('download', { error: "File not found!"})
        }
        // console.log(file)
        return res.render('download', {
            id: file._id,
            fileName: file.filename,
            fileSize: (file.size/1000000).toFixed(2),
            download: `http://localhost:3200/files/download/${file._id}`
        })
    } catch (error) {
        return res.render('download', { error: "Something went wrong!"})
    }
})

module.exports = router
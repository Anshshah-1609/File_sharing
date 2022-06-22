const router = require('express').Router()
const File = require('../models/file')

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const file = await File.findById(id)

    if(!file) {
        return res.render('download', { error: "Sorry! link has been expired!"})
    }
    const filePath = `${__dirname}/../${file.path}`
    res.download(filePath)
})

module.exports = router
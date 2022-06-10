const mongoose = require('mongoose')
// mongodb+srv://anshah016:<password>@cluster0.1ogcs.mongodb.net/test
const url = "mongodb+srv://anshah016:anshah016@cluster0.1ogcs.mongodb.net/test"

mongoose.connect( url, { useNewUrlParser: true }, () => {
    console.log("Connected to MongoDB Atlas")
})
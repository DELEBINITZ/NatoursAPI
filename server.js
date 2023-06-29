const dotenv = require("dotenv")
const app = require("./app")
const mongoose = require("mongoose")

const port = process.env.PORT || 3000
mongoose
  .connect(
    "mongodb+srv://akshaytupe00:Akshay9309@cluster0.mj07d8z.mongodb.net/"
  )
  .then(result => {
    console.log("Connected to database")
    app.listen(port, () => {
      console.log(`App running on port ${port}...`)
    })
  })
  .catch(err => {
    console.log(err)
  })

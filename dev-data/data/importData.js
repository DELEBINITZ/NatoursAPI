const fs = require("fs")
const mongoose = require("mongoose")
const Tour = require("../../models/tourModel")
mongoose
  .connect(
    "mongodb+srv://akshaytupe00:Akshay9309@cluster0.mj07d8z.mongodb.net/"
  )
  .then(result => {
    console.log("Connected to database")
  })
  .catch(err => {
    console.log(err)
  })

const data = JSON.parse(fs.readFileSync(`${__dirname}/toursData.json`, "utf-8"))
console.log(data.length)
const importData = async () => {
  try {
    await Tour.create(data)
    console.log("data has been imported into the database")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log("data has been deleted from the database")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}
if (process.argv[2] === "--import") {
  importData()
} else if (process.argv[2] === "--delete") {
  deleteData()
}

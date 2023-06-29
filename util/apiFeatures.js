class APIFeatures {
  constructor(query, queryObject) {
    this.query = query
    this.queryObject = queryObject
  }

  filter() {
    const excludeFields = ["page", "sort", "limit", "fields"]
    let queryObj = { ...this.queryObject }

    excludeFields.forEach(el => delete queryObj[el])

    // QUERYING
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort("-createdAt")
    }

    return this
  }

  limitFields() {
    if (this.queryObject.fields) {
      const feilds = this.queryObject.feilds.split(",").join(" ")
      this.query = this.query.select(feilds)
    } else {
      this.query = this.query.select("-__v")
    }

    return this
  }

  paginate() {
    const page = this.queryObject.page * 1 || 1
    const limit = this.queryObject.limit * 1 || 5
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}
module.exports = APIFeatures
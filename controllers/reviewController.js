const Review = require("../models/reviewModel")
const catchAsync = require(".././util/catchAsync")

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews: reviews
    }
  })
})

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new AppError(`could not find the review with ${req.params.id} Id`, 404)
    )
  }
  res.status(200).json({
    status: "success",
    data: {
      review
    }
  })
})

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    user: req.body.user,
    tour: req.body.tour,
    createdAt: req.body.createdAt
  })
  res.status(201).json({ status: "success", data: { review: newReview } })
})

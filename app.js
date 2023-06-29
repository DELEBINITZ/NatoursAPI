const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const rateLimit = require("express-rate-limit")
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const AppError = require("./util/appError")
const globalErrorHandler = require("./controllers/errorController")

const app = express()

// Set security HTTP headers
app.use(helmet())
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
})
app.use("/api", limiter)
// Logging
app.use(morgan("dev"))
// json parser
app.use(express.json({ limit: "10kb" }))
// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
// Data sanitization against XSS
app.use(xss())
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price"
    ]
  })
)
// Serving static files
app.use(express.static(`${__dirname}/public`))
// Routes
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/reviews", reviewRouter)
// 404 handler
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} url`, 404))
})
// error handler
app.use(globalErrorHandler)

module.exports = app

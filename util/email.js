const nodeMailer = require("nodemailer")

const sendEmail = options => {
  const transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    auth: {
      user: "15b5b3a152b4e8",
      pass: "46403133825774"
    }
  })

  const mailOptions = {
    from: "Akshay <akshaytupe00@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  transporter.sendMail(mailOptions)
}

module.exports = sendEmail

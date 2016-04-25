module.exports = {
  gmail: {
    transports: [{
      type: "smtp",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.GMAIL_AUTH_USER,
        pass: process.env.GMAIL_AUTH_PASSWORD
      }
    }]
  }
};

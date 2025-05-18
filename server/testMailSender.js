const mailSender = require("./utils/mailSender");

mailSender("your@email.com", "Test Email", "<h1>This is a test email</h1>")
  .then(res => {
    console.log("Mail send result:", res);
  })
  .catch(err => {
    console.error("Mail send error:", err);
  });

const nodemailer = require('nodemailer');

const sendEmail = async (referrerName, referrerEmail, refereeName, refereeEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
            name: referrerName,
            address: process.env.GMAIL_USER
         },
    to: refereeEmail,
    subject: `Referral from ${referrerName}`,
    text: `${referrerName} has referred you to our platform. Contact them at ${referrerEmail} for more details.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

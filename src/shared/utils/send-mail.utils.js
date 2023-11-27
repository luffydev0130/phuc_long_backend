const nodemailer = require('nodemailer');

/**
 * Send mail
 * @param {string} to
 * @param {string} subject
 * @param {string} htmlTemplate
 * @returns {Promise}
 */
const sendMail = async (to, subject, htmlTemplate) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlTemplate,
  });
  return info;
};

module.exports = sendMail;

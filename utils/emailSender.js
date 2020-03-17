const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get('email'),
    pass: config.get('pass')
  }
});

var mailOptions = {
  from: config.get('email')
};

const sendMail = ({receiver, subject, text, html}) => {
    mailOptions.to = receiver;
    mailOptions.subject = subject;
    if(!html)
        mailOptions.text = text;
        else
        mailOptions.html = html;
    transporter.sendMail(mailOptions);
}

module.exports =  sendMail;
const nodemailer = require('nodemailer')
require('dotenv').config()
const express = require('express')
const User = require('../models/userSch')
const router = express.Router();
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
    secure: true,
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.email_username,
        pass: process.env.email_pass
    }
})

const sendResetEmail = (mail, token) => {
    const resetUrl = `http://localhost:3030/password/reset/${token}`;
    transporter.sendMail({
        to: mail,
        from: 'amulya<no-reply@gmail.com>',
        subject: 'Password Reset',
        html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
      `,
    });
};


router.post('/password/reset', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ msg: "User with the email does not exists" })
        }
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPassTokenExpiry = Date.now() + 900000 //15 min for the link is sent
        await user.save();
        sendResetEmail(user.email, token);
        res.send(`Password reset link sent to:${user.email} `)
        console.log(token)
    } catch (err) {
        res.status(404).json({ msg: "Bad request" })
    }
})

//reset password using token


router.post('/password/Reset/:token', async (req, res) => {

    try {
        const { token } = req.params;
        console.log(token)
        const { New_password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPassTokenExpiry: { $gt: Date.now() }
        });

        console.log(user);
        console.log('Token in URL:', token);

        if (!user) {
            return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
        }

        const hashedpass = await bcrypt.hash(New_password, 10) 

        user.password = hashedpass;
       // await user.password();
      // await bcrypt.hash(user.password, 10) 
      user.resetPasswordToken = undefined;
        user.resetPassTokenExpiry = undefined;
        await user.save();

        res.status(200).send('Password has been reset successfully.');

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
});

module.exports = router;
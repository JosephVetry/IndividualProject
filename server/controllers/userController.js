const { User } = require('../models');
const { signToken } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const nodemailer = require('nodemailer')

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: 'Email is required' }
            if (!password) throw { name: 'Password is required' }

            const user = await User.findOne({ where: { email } })

            if (!user) throw { name: 'User not found' }

            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (!isValidPassword) throw { name: 'Wrong password' }

            const payload = signToken({
                id: user.id,
                email: user.email
            })

            const token = jwt.sign(payload, SECRET)

            res.json({ access_token: token })
        } catch (err) {
            // next(err)
            console.log(err);
        }
    }
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({
                username, email, password
            })
            if (user) {
                await Controller.mail(email)
            }
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (err) {
            // next(err)
            console.log(err);
        }
    }

    static async mail(receiverEmail) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
            from: '"pahami" <foo@example.com>', // sender address
            to: receiverEmail, // list of receivers
            subject: "Register Success", // Subject line
            text: "Hello world?", // plain text body
            html: "Register Success", // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    

}
module.exports = Controller;
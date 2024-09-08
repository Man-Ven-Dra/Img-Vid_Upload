const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
require('dotenv').config();

const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC ", doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PWD,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        console.log('transporter', transporter)
        let info = await transporter.sendMail({
            from: 'file',
            to: doc.email,
            subject: 'File Upload Message',
            html: `<h2>Hello!</h2> <p>Congratulations! File Uploaded Successfully to Cloudinary.</p> <p>Use the URL given below to see the File.</p> <a href=${doc.imageUrl}>File URL</a>`
        })
        console.log('INFO', info)
    }
    catch (err){
        console.log('ERROR ', err);
    }
})

module.exports = mongoose.model('File', fileSchema)
const express = require('express');
const connectDB = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileupload = require('express-fileupload');
const router = require('./routes/fileUpload');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT

app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use('/api/v1/upload', router);

connectDB();
cloudinaryConnect();

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
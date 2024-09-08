const File = require('../models/files')
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async(req, res) => {
    try {
        const file = req.files.file;
        console.log('FILE: ', file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log('PATH: '+ path);

        file.mv(path, (err) => {
            console.log(err);
        })
        res.status(200).json({
            success:true,
            message: 'File Uploaded Locally'
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    let options = {folder}

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async(req, res) => {
    try {
        const { name, tags, email } = req.body;
        const image = req.files.file;

        console.log('File: ', image);
        console.log(name, tags, email);

        const supportedTypes = ['jpg', 'png', 'jpeg']
        const fileType = image.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File Type not Supported'
            })
        }

        const response = await uploadFileToCloudinary(image, "sampleFolder");
        console.log(response);
        const DBdata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Uploaded Successfully',
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Image Upload Failed'
        })
    }
}

exports.videoUpload = async(req, res) => {
    try {
        const { name, tags, email } = req.body;
        const video = req.files.file;

        console.log('File: ', video);
        console.log(name, tags, email);

        const supportedTypes = ['mp4', 'mov']
        const fileType = video.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File Type not Supported'
            })
        }

        const response = await uploadFileToCloudinary(video, "sampleFolder");
        console.log(response);
        const DBdata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video Uploaded Successfully',
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Video Upload Failed'
        })
    }
}

exports.imageSizeReducer = async(req, res) => {
    try {
        const { name, tags, email } = req.body;
        const image = req.files.file;

        console.log('File: ', image);
        console.log(name, tags, email);

        const supportedTypes = ['jpg', 'png', 'jpeg']
        const fileType = image.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File Type not Supported'
            })
        }

        const response = await uploadFileToCloudinary(image, "sampleFolder", 30);
        console.log(response);
        const DBdata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Uploaded Successfully',
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Video Upload Failed'
        })
    }
}
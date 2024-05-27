import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads'); // Relative path to the 'uploads' directory
    },
    filename: function(req, file, callback) {
        const fieldname = file.fieldname;
        req.body[fieldname] = `${file.originalname}_withUserID_${req.body.userID}`

        callback(null, `${file.originalname}_withUserID_${req.body.userID}`);
    }
});

const upload = multer({ storage: storage });

export default upload;

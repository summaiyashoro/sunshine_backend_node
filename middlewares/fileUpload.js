import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function(req, file, callback) {
        const fieldname = file.fieldname;
        req.body[fieldname] = `${uuidv4()}_${file.originalname}`

        callback(null, `${uuidv4()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

export default upload;

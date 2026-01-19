import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limit: {
    filesize: 2 * 1024 * 1024, //2mb
  },
});

export default upload;

const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle, uploadMultiple } = require('../middleware/multer');

router.get("/product", apiController.getProduct);

module.exports = router;

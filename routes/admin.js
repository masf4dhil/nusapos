const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middleware/multer');
// const auth = require('../middleware/auth');

router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.actionSignin);
// router.use(auth);
router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

router.get("/product", adminController.viewProduct);
router.post("/product", uploadSingle, adminController.addProduct);
router.put("/product", uploadSingle, adminController.editProduct);
module.exports = router;
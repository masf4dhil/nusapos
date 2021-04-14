const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middleware/multer');
const auth = require('../middleware/auth');

router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.get("/logout", adminController.actionLogout);

router.get("/dashboard", adminController.viewDashboard);
router.post("/dashboard/addBook", adminController.addBook);
router.post("/dashboard/addTrans", adminController.addTrans);


router.get("/member", adminController.viewMember);

router.get("/discount", adminController.viewDiscount)
router.post("/discount", adminController.addDiscount);
router.delete("/discount/:id", adminController.deleteDiscount)

router.get("/transaction", adminController.viewTransaction);

// router.get("/barcode", adminController.viewBarcode);
router.get("/product", adminController.viewProduct);
router.post("/product", uploadSingle, adminController.addProduct);
router.put("/product", uploadSingle, adminController.editProduct);
router.delete('/product/:id', adminController.deleteProduct);
module.exports = router;
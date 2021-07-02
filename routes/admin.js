const router = require('express').Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController')
const { uploadSingle, uploadMultiple } = require('../middleware/multer');
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.get("/logout", adminController.actionLogout);

// ketika login succes akan mengarahkan ke screen view dashboard
router.get("/dashboard", adminController.viewDashboard);
router.post("/dashboard/addBook", adminController.addBook);
router.post("/dashboard/addTrans", adminController.addTrans);


router.get("/member", adminController.viewMember);

router.get("/transaction", transactionController.viewTransaction);
router.get("/transaction/:id", transactionController.showDetailTransaction);
// router.get("/barcode", adminController.viewBarcode);
router.get("/product", productController.viewProduct);

router.post("/product", uploadSingle, productController.addProduct);
router.put("/product", uploadSingle, productController.editProduct);
router.delete('/product/:id', productController.deleteProduct);
module.exports = router;
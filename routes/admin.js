const router = require('express').Router();
const adminController = require('../controllers/adminController');
// const auth = require('../middleware/auth');

// router.get("/signin", adminController.viewSignIn);
// router.post("/signin", adminController.actionSignin);
// router.use(auth);
// router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);


module.exports = router;
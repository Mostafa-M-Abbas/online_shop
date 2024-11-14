const router = require('express').Router(); 
const authController = require('../controllers/auth.controller');
const authGuard = require('../guards/auth.guard');

router.get("/signup", authGuard.notAuth, authController.getSignup);
router.post("/signup", authGuard.notAuth, authController.postSignup);
router.get("/login", authGuard.notAuth, authController.getLogin);
router.post("/login", authGuard.notAuth, authController.postLogin);
router.post("/logout", authGuard.isAuth, authController.logout);

module.exports = router;
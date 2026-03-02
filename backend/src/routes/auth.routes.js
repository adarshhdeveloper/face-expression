const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const authmiddleware = require('../middlewares/auth.middleware')


const authRouter = Router()


authRouter.post('/register',authController.registerUser)
authRouter.post('/login',authController.loginUser)
authRouter.post('/login',authController.loginUser)
authRouter.get('/get-me',authmiddleware.authUser,authController.getMe)
authRouter.get('/logout',authController.logoutUser)


module.exports = authRouter
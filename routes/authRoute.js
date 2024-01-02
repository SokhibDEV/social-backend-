import experss from 'express'
import {register, login, logout} from '../controlles/authCont.js'

const router = experss.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router
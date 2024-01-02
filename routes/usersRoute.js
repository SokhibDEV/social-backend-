import experss from 'express'
import {getUser, updateUser} from '../controlles/usersCont.js'

const router = experss.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)

export default router


    

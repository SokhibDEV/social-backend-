import experss from 'express'
import {getLikes, addLike, deleteLike} from '../controlles/likesCont.js'
const router = experss.Router()
router.get("/", getLikes)
router.post("/", addLike)
router.delete("/", deleteLike)

export default router
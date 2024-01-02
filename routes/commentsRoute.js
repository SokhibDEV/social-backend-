import experss from 'express'
import {getComments, addComment} from '../controlles/commentsCont.js'

const router = experss.Router()

router.get("/", getComments)
router.post("/", addComment)

export default router
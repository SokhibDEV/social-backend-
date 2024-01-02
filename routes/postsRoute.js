import experss from 'express'
import {getPosts, addPost, deletePost} from '../controlles/postsCont.js'

const router = experss.Router()

router.get("/", getPosts)
router.post("/", addPost)
router.delete("/:postId", deletePost)

export default router
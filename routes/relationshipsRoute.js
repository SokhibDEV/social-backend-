import experss from 'express'
import {getReletionships, addReletionship, deleteReletionship} from '../controlles/relationshipsCont.js'
const router = experss.Router()
router.get("/", getReletionships)
router.post("/", addReletionship)
router.delete("/", deleteReletionship)

export default router
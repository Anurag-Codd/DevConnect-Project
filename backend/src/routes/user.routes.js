import express from "express"
import { acceptConnectionRequest, rejectConnectionRequest, sendConnectionRequest, updateProfile } from "../controllers/user.js"
import authMiddlware from "../middleware/authorization.js"

const router = express.Router()

router.post("/update-profile",authMiddlware,updateProfile)
router.post("/send-req",authMiddlware,sendConnectionRequest)
router.post("/accept-req",authMiddlware,acceptConnectionRequest)
router.post("/reject-req", authMiddlware,rejectConnectionRequest)


export default router
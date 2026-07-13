import { Router } from "express";
// import { login } from "../controllers/user.controller.js";
// import { register } from "../controllers/user.controller.js";
import {
    addToHistory,
    getUserHistory,
    login,
    register,
    createMeeting,
    validateMeeting
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add_to_activity").post(addToHistory)
router.route("/get_all_activity").get(getUserHistory)
router.route("/createMeeting").post(createMeeting);
router.route("/validateMeeting").post(validateMeeting);

export default router;
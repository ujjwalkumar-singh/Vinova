import { User } from "../models/user.model.js";
import httpStatus from "http-status"
import bcrypt, { hash } from "bcrypt"
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";


export const createMeeting = async (req, res) => {
    try {

        const { token, meetingCode } = req.body;

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        const newMeeting = new Meeting({
            userId: user.username,
            meetingCode,
            type: "created"
        });

        await newMeeting.save();

        res.status(201).json({
            message: "Meeting created"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};
export const validateMeeting = async (req, res) => {
    try {
        const { meetingCode } = req.body;
        const meeting = await Meeting.findOne({
            meetingCode,
            type: "created"
        });
        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Invalid Meeting Code"
            });
        }
        return res.status(200).json({
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "provide given details" })
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "user not found" })
        }

        if (await bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        }
        else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: `wrong password` })
        }

    } catch (error) {
        res.status(500).json({ message: `some thing went wrong ${error}` })
    }

}

export const register = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        })
        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "user registed" })
    } catch (error) {
        res.json({ message: `some thing went wrong ${error}` })
    }
}
// export const getUserHistory = async (req, res) => {
//     const { token } = req.query;

//     try {
//         const user = await User.findOne({ token: token });
//         const meetings = await Meeting.find({ user_id: user.username })
//         res.json(meetings)
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }
export const getUserHistory = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const meetings = await Meeting.find({
            userId: user.username,
            type: "history"
        });
        res.json(meetings);
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` });
    }
};

// export const addToHistory = async (req, res) => {
//     const { token, meeting_code } = req.body;
//     //  console.log("hii ujjwal");

//     try {
//         const user = await User.findOne({ token: token });

//         const newMeeting = new Meeting({
//             user_id: user.username,
//             meetingCode: meeting_code
//         })

//         await newMeeting.save();

//         res.status(httpStatus.CREATED).json({ message: "Added code to history" })
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }
export const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;
    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const newMeeting = new Meeting({
            userId: user.username,
            meetingCode: meeting_code,
            type: "history"
        });
        await newMeeting.save();
        res.status(httpStatus.CREATED).json({ message: "Added code to history" });
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` });
    }
};
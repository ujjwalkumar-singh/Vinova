import React, { useContext, useState } from 'react'
import withAuth from '../utils/WithAuth.jsx'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../context/Authcontext.jsx';
import axios from "axios";
import server from "../environment.js";

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            alert("Please enter a meeting code");
            return;
        }
        try {

            const response = await axios.post(
                `${server.prod}/api/v1/users/validateMeeting`,
                {
                    meetingCode
                }
            );

            if (response.data.success) {

                if (localStorage.getItem("token")) {
                    await addToUserHistory(meetingCode);
                }

                navigate(`/${meetingCode}`);
            }

        } catch (err) {
            alert("Invalid Meeting Code");
        }
        // try {

        //     const response = await axios.post(
        //         `${server.prod}/api/v1/meeting/validateMeeting`,
        //         {
        //             meetingCode
        //         }
        //     );

        //     // Meeting exists
        //     if (response.data.success) {

        //         // Save history only for authenticated users
        //         if (localStorage.getItem("token")) {
        //             await addToUserHistory(meetingCode);
        //         }


        //         navigate(`/${meetingCode}`);
        //     }

        // } catch (err) {
        //     alert("Invalid Meeting Code");
        // }
    }
    const handleCreateMeeting = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to create a meeting");
            return;
        }
        if (!meetingCode.trim()) {
            alert("Please enter a meeting code");
            return;
        }
        console.log(server.prod);
        try {

            await axios.post(
                `${server.prod}/api/v1/users/createMeeting`,
                {
                    token,
                    meetingCode
                }
            );

            await addToUserHistory(meetingCode);

            navigate(`/${meetingCode}`);

        } catch (err) {
            console.log(err);

            alert(err.response?.data?.message || "Unable to create meeting");

        }
    };
    return (
        <>

            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Video Call</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }
                    }>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>
                    {
                        !localStorage.getItem("token") ? (
                            <Button onClick={() => navigate("/auth")}>
                                Login
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/auth");
                                }}
                            >
                                Logout
                            </Button>
                        )
                    }
                    {/* { if (localStorage.getItem("token")){
                        <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Login
                    </Button>
                    }}
                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button> */}
                </div>


            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Providing Quality Video Call Just Like Quality Education</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>

                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                            <Button
                                onClick={handleCreateMeeting}
                                variant="outlined"
                            >
                                Create Meeting
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
            </div>
        </>
    )
}


export default (HomeComponent)
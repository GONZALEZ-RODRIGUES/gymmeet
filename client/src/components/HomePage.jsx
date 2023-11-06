import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/background-video-1.mp4";
import axios from "axios";
import "../styles/HomePage.css";
import Alert from '@mui/material/Alert';

function HomePage () {
    const emailInput = useRef("");
    const passwordInput = useRef("");
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();

    const handleRequest = async (e) => {
        e.preventDefault();
        
        const userData = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
        };
        
        const url = "http://localhost:5100/login";

        try {
            const response = await axios.post(url, userData);
            if (response.status === 200 && response.data !== false) {
                navigate("/home");
            } else {
                setAlertOpen(true);
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }

    return (
        <div className="bgContainer">
            <div className="overlay"></div>
                <video className="video" src={video} autoPlay loop muted />
                <div className="container-title">
                    <h1 className="title">GymMeet</h1>
                    <h2 className="text">Do it together</h2>
                </div>
                <div className="container-login">
                    <form className="form-login" action="#" onSubmit={handleRequest}>
                        <label className="label-login" htmlFor="email">
                        </label>
                        <input
                            className="input-login"
                            type="text"
                            name="email"
                            placeholder="Email"
                            ref={emailInput}
                        />
                        <label className="label-login" htmlFor="password">
                        </label>
                        <input
                            className="input-login"
                            type="password"
                            name="password"
                            placeholder="Password"
                            ref={passwordInput}
                        />
                        <button className="button-login">Login</button>
                    </form>
                    <div className="newacc">
                    {alertOpen && (
                        <Alert severity="error" onClose={() => setAlertOpen(false)}>
                            Invalid email or password
                        </Alert>
                    )}
                    <a className="link-newacc" href="/new">
                        Create An Account
                    </a>
                    </div>
                </div>
        </div>
    )
}

export default HomePage;
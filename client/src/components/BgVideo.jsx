import React from "react";
import video from "../assets/background-video-1.mp4";

function BgVideo () {
    return (
        <div className="bgContainer">
            <div className="overlay"></div>
                <video className="video" src={video} autoPlay loop muted />
                <div className="container">
                    <h1 className="title">GymMeet</h1>
                    <h2 className="text">Do it together</h2>
                </div>
        </div>
    )
}

export default BgVideo;
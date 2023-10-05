import React from "react";

function Logo({fontSize = 48}) {
    return (
        <div>
            <p style={{fontSize: fontSize + 'px'}}  className="logo">GPTQuest</p>
        </div>
    )
}

export default Logo;
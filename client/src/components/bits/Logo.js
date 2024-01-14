import React from "react";

function Logo({colorProp, fontProp}) {

    const fontSize = fontProp
    const color = colorProp
    
    const shadowSize = Math.round(fontSize/16).toString()
    
    const style = {
        fontSize: fontSize + 'px',
        textShadow: `0px ${shadowSize}px 0px #737264`,
        color: color

    }
    
    return (
        <div>
            <p className="logo" style={style}  >GPTQuest</p>
        </div>
    )
}

export default Logo;
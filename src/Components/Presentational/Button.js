import React from 'react';

const Button = ({buttonText, handleClick, styleClass}) => {
    let className = 'btn '+ styleClass;

    return(
        <button className = {className} onClick = {handleClick}>{buttonText}</button>
    )
}   

export default Button;
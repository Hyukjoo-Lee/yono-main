import React from "react";
import styled from "styled-components";



const InputStyle = styled.input`
width: ${(props) => (props.width ? props.width : "211px")};
height : ${(props) => (props.height ? props.height : "38px")};
background-color: ${(props)=> props.background ? props.background :props.theme.color.white};
border: 1px solid ${(props) => props.borderColor || "#D7D7D7"}; 
border-radius:${(props) => props.borderRadius ? props.borderRadius : "5px"};
placeholder : ${(props) => props.placeholder || "#aaa"};
cursor:pointer;
padding : 0 10px;
&:hover {
    & p {color: ${(props) =>props.hoverColor ? props.hoverColor : props.theme.color.white};
    }
`;

const TextStyle = styled.p`
font-size: ${(props) => props.fontSize ? props.fontSize :props.theme.fontSize.md};
color : ${(props) => props.color ? props.color :props.theme.color.white};
margin : 0px;
`;

const CustomInput = (props) => {
    const {
    placeholder,
    text,
    type ="text",
    width,
    height,
    background,
    color,
    borderColor,
    borderRadius,
    fontSize,
    disabled,
    hoverBk,
    hoverColor,
    } = props;

    return (
        <div>
        <TextStyle 
        color={color} 
        fontSize={fontSize}>
        {text}

        </TextStyle>
        
        <InputStyle
        placeholder={placeholder}
        type={type}
        width={width}
        height={height}
        background={background}
        borderColor={borderColor}
        borderRadius={borderRadius}
        hoverBk={hoverBk}
        hoverColor={hoverColor}
        disabled={disabled}
        />
        </div>

    );
    

};
export default CustomInput;
import React from "react";
import styled from "styled-components";

export const ButtonStyle = styled.button`
  width: ${(props) => (props.width ? props.width : "162px")};
  height: ${(props) => (props.height ? props.height : "48px")};
  background-color: ${(props) =>
    props.background ? props.background : props.theme.color.blue};
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "0px"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "50px"};
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.hoverBk ? props.hoverBk : props.theme.color.blue};
    & p {
      color: ${(props) =>
        props.hoverColor ? props.hoverColor : props.theme.color.white};
    }
  }
`;

export const TextStyle = styled.p`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.theme.fontSize.md};
  color: ${(props) => (props.color ? props.color : props.theme.color.white)};
  margin: 0px;
  line-height: 22px;
`;

import React from 'react';
import styled from 'styled-components';

const StyledInfoWrap = styled.div`
    margin-bottom: 37px;
`
const StyledTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    margin:0px 0px 0px 16px;
`
const StyledTitleSub = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #757575;
    line-height: 150%;
    margin: 0px 0px 0px 66px;
`
const StyledBoxImg = styled.div`
    width: 50px;
    height: 50px;
    background-color:#EFF3FD ;
    border-radius: 7px;
`

const StyledBox = styled.div`
    display: flex;
`

const InfoCard = ({ title, subtitle }) => (
    <StyledInfoWrap className="info_wrap">
        <StyledBox className="box">
            <StyledBoxImg className="box_img"></StyledBoxImg>
            <StyledTitle className="title">{title}</StyledTitle>
        </StyledBox>
        <StyledTitleSub className="title_sub">{subtitle}</StyledTitleSub>
    </StyledInfoWrap>
);

export default InfoCard;
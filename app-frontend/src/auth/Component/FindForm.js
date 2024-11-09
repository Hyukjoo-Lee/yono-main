import React from "react"; 
import CommonInput from "../../../common/Commoninput";
import CommonSelect from "../../../common/CommonSelect";
import styled from "styled-components";
import CommonButton from "../../../common/CommonButton";
const Page = styled.div`
    border: 1px solid white;

`;
const Title = styled.div`
    position : absolute;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-family:Noto Sans;
    color: #4064E6;
    font-weight:bold;
    margin-top : 281px;
    margin-left: 615px;

`;

const  FindForm =({find})=>{
    const selectOptions=[
        {value:"애완동물 이름은?", label:"애완동물 이름은?"},
        {value:"당신의 생일은?", label:"당신의 생일은"},
        {value:"당신이 좋아하는 음식은?", label:"당신이 좋아하는 음식은?"},
    ];

return(
<Page>
<Title>{find}</Title>

<div style={{position:'absolute',
    justifyContent:'center',
    marginTop:'388px',
    marginLeft:'487px',
    }}>
 <CommonSelect
 text = '질문선택'
 height ='54px'
 width='500px'
 padding='10px'
 background='#ffffff'
 color='#464646'
 labelColor='#464646'
 borderRadius='5px'
 hoverBackground='red'
 fontSize='16px'
 fieldBorderColor='#DDDDDD'
 fieldHoverBorderColor='#4064E6'
 fieldFocusedBorderColor='orange'
 options={selectOptions}
 defaultText="질문을 선택하세요"
 />
 
 </div>
<div style={{position:'absolute',
    justifyContent:'center',
    marginTop:'481px',
    marginLeft:'487px',
  
    
    }}>
<CommonInput
   text = '답변'
   padding = '10px'
    backgroundColor= '#FFFFFF' 
    fontSize='16px'
    fontFamily= 'Noto Sans'
    color= '#464646'
    fontWeight='bold'
    width='500px'
    height='54px'
    borderRadius='5px'
    fieldBorderColor='red'
    focusBorderWidth='10px'
    fieldHoverBorderColor='#4064E6'
    // fieldFocusedBorderColor='green'
    hoverBackground='#ffffff'
/>

</div>
<div style={{position:'absolute',
    justifyContent:'center',
    marginTop:'584px',
    marginLeft:'634px',
    display:'flex',
    gap:'10px'
    }}>
<CommonButton
text="확인"
width="100px"
height="40px"
background="#4064E6"
color="#ffffff"
borderColor="#4064E6"
borderRadius="5px"
fontSize="20"
// disabled,
// onClick,
hoverBk="white"
hoverColor="black"

/>
<CommonButton
text="취소"
width="100px"
height="40px"
background="#ffffff"
color="black"
borderColor="#4064E6"
borderRadius="5px"
fontSize="20"
// disabled,
// onClick,
hoverBk="#4064E6"
hoverColor="white"

/>
</div>
</Page>

    
);

};
export default FindForm;
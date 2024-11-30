import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import { Box, Grid2 } from '@mui/material';
import CardSlider from './CardSlider';
import CommonButton from '../../common/CommonButton';
import { useState, useEffect } from 'react';

const FormBox = styled.form`
  width: 100%;
  border-radius: 5px;
  overflow-y: auto;
  background-color: ${(props) => props.background || '#EFF3FD'};
`;
const FORM_FIELDS = {
  cardNumber: {
    text: '카드번호',
    placeholder: '카드번호를 입력하세요 (-제외)',
  },
  cvc: {
    text: 'CVC',
    placeholder: '뒷면 서명란 끝 3자리',
  },
  cardValidity: {
    text: '유효기간',
    placeholder: '날짜를 입력하세요 (/제외)',
  },
  englishName: {
    text: '영문이름',
    placeholder: '영문이름을 입력하세요',
  },
};

const CARD_LIST = [
  { value: '0301', label: '국민카드' },
  { value: '0302', label: '현대카드' },
  { value: '0303', label: '삼성카드' },
  { value: '0304', label: '농협카드' },
  { value: '0306', label: '신한카드' },
];

const useCardImages = (cardImg, selectedCardType) => {
  const [cardImages, setCardImages] = useState(null);

  useEffect(() => {
    if (cardImg && selectedCardType) {
      const selectedCardData = cardImg[selectedCardType];
      if (selectedCardData) {
        const cardTypeKey = Object.keys(selectedCardData)[0];
        const images = Object.values(selectedCardData[cardTypeKey]);
        setCardImages(images);
      }
    }
  }, [cardImg, selectedCardType]);

  return cardImages;
};

const CardRegFormBox = ({ cardImg }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cvc: '',
    cardValidity: '',
    englishName: '',
    selectedCardType: '',
  });

  const cardImages = useCardImages(cardImg, formData.selectedCardType);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { cardNumber, cvc, cardValidity, englishName, selectedCardType } =
      formData;
    if (
      !cardNumber ||
      !cvc ||
      !cardValidity ||
      !englishName ||
      !selectedCardType
    ) {
      alert('필수 필드를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    // TODO: 백엔드 구축 후 카드 등록 로직 추가
  };

  return (
    <FormBox onSubmit={handleSubmit}>
      <Box style={{ padding: '50px' }}>
        <Grid2 container rowSpacing={1} columnSpacing={4}>
          <Grid2 size={24}>
            <CommonInput
              {...FORM_FIELDS.cardNumber}
              width={'100%'}
              margin="0px"
              value={formData.cardNumber}
              onChange={handleInputChange('cardNumber')}
            />
          </Grid2>

          {['cvc', 'cardValidity', 'englishName'].map((field) => (
            <Grid2 key={field} size={6}>
              <CommonInput
                {...FORM_FIELDS[field]}
                width={'100%'}
                value={formData[field]}
                onChange={handleInputChange(field)}
              />
            </Grid2>
          ))}

          <Grid2 size={6}>
            <CommonSelect
              text="카드선택"
              margin="0px 0px 0px 0px"
              labelColor={'#4a4a4a'}
              width={'227.75px'}
              options={CARD_LIST}
              selectedValue={formData.selectedCardType}
              setSelectedValue={(value) =>
                handleInputChange('selectedCardType')({ target: { value } })
              }
            />
          </Grid2>

          <Grid2 size={12}>
            <CardSlider cardImages={cardImages} />
          </Grid2>
          <Grid2 container justifyContent="center" size={12} pt={3}>
            <CommonButton
              fontSize="16px"
              width="120px"
              height="35px"
              text="카드 등록"
              type="submit"
            />
          </Grid2>
        </Grid2>
      </Box>
    </FormBox>
  );
};

export default CardRegFormBox;

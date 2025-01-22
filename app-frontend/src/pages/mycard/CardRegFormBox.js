import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonSelect from '../../common/CommonSelect';
import { Box, Grid2 } from '@mui/material';
import CardSlider from './CardSlider';
import CommonButton from '../../common/CommonButton';
import { useState, useEffect } from 'react';
import ValidationMessage from '../../common/ValidationMessage';
import theme from '../../theme/theme';
import {
  CARD_DUPLICATE_MESSAGE,
  CARD_REGEX_MESSAGE,
  CARDPWD_REGEX_MESSAGE,
  EMPTY_CARD_SELECT_MESSAGE,
  EMPTY_CARDNUM_MESSAGE,
  EMPTY_CARDPWD_MESSAGE,
  EMPTY_COMPANY_SELECT_MESSAGE,
  EMPTY_VALIDITY_MESSAGE,
  VALIDITY_REGEX_MESSAGE,
} from '../../common/Message';

const FormBox = styled.form`
  width: 100%;
  border-radius: 5px;
  overflow-y: auto;
  background-color: ${(props) => props.background || '#EFF3FD'};
`;

const FORM_FIELDS = {
  cardNumber: {
    placeholder: '카드번호를 입력하세요',
    text: '카드번호',
    maxLength: 19,
    errorMessage: {
      empty: EMPTY_CARDNUM_MESSAGE,
      invalid: CARD_REGEX_MESSAGE,
      duplicate: CARD_DUPLICATE_MESSAGE,
    },
  },
  cardPwd: {
    placeholder: '카드 비밀번호를 입력하세요',
    text: '카드 비밀번호',
    regex: /^\d{4}$/,
    maxLength: 4,
    type: 'password',
    errorMessage: {
      empty: EMPTY_CARDPWD_MESSAGE,
      invalid: CARDPWD_REGEX_MESSAGE,
    },
  },
  cardValidity: {
    placeholder: '날짜를 입력하세요 (/제외)',
    text: '유효기간',
    regex: /^(0[1-9]|1[0-2])\d{2}$/,
    maxLength: 4,
    errorMessage: {
      empty: EMPTY_VALIDITY_MESSAGE,
      invalid: VALIDITY_REGEX_MESSAGE,
    },
  },
  selectedCardTitle: {
    text: '카드 종류',
    errorMessage: {
      empty: EMPTY_CARD_SELECT_MESSAGE,
    },
  },
  selectedCardType: {
    text: '카드 회사',
    errorMessage: {
      empty: EMPTY_COMPANY_SELECT_MESSAGE,
    },
  },
};

const CARD_COMPANY_LIST = [
  { value: '0301', label: '국민카드' },
  { value: '0302', label: '현대카드' },
  { value: '0303', label: '삼성카드' },
  { value: '0304', label: '농협카드' },
  { value: '0306', label: '신한카드' },
];

// const useCardImages = (cardImg, selectedCardType) => {
//   const [cardImages, setCardImages] = useState(null);

//   useEffect(() => {
//     if (cardImg && selectedCardType) {
//       const selectedCardData = cardImg[selectedCardType];
//       if (selectedCardData) {
//         const cardTypeKey = Object.keys(selectedCardData)[0];
//         const images = Object.values(selectedCardData[cardTypeKey]);
//         setCardImages(images);
//       }
//     }
//   }, [cardImg, selectedCardType]);

//   return cardImages;
// };

const CardRegFormBox = ({ cardImg }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardPwd: '',
    cardValidity: '',
    selectedCardTitle: '', // 카드이름
    selectedCardType: '', // 기관코드
  });

  const [formMessage, setFormMessage] = useState({
    cardNumber: '',
    cardPwd: '',
    cardValidity: '',
    selectedCardTitle: '',
    selectedCardType: '',
  });

  const fetchCardData = async (cardCompany) => {
    try {
      const response = await fetch(
        `http://localhost:8065/card/company?organization=${cardCompany}`,
      );
      const data = await response.json();

      if (data.status === 200) {
        setCardList(data.data.map((card) => card.cardTitle)); // 카드 이름 목록 저장
        setCardImages(data.data.map((card) => card.imageUrl)); // 카드 이미지 목록 저장
      } else {
        console.error('카드 데이터를 가져오는 데 실패했습니다:', data.message);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  const [cardList, setCardList] = useState([]); // 카드 목록
  const [cardImages, setCardImages] = useState([]); // 카드 이미지

  // 카드 회사 선택 시 카드 목록 가져오기
  const handleCardCompanyChange = async (value) => {
    setFormData((prev) => ({
      ...prev,
      selectedCardType: value,
      selectedCardTitle: '', // 카드 종류 초기화
    }));
    try {
      const response = await fetch(`http://localhost:8065/card/${value}`); // API 요청
      const data = await response.json();

      if (data.status === 200) {
        setCardList(data.data); // 카드 목록 저장
      } else {
        setCardList([]);
        console.error('카드 데이터를 가져오는 데 실패했습니다:', data.message);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  const [cardNumToSave, setCardNumToSave] = useState('');

  const handleCardNumChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length > 16) return; // 최대 16자리 제한

    // 하이픈 추가 로직
    // TODO: 제거하고 빈칸 4개로 만들기 (마지막 8자리 마스킹 처리 예정)
    let formattedValue = numericValue;
    if (numericValue.length > 4) {
      formattedValue = numericValue.slice(0, 4) + '-' + numericValue.slice(4);
    }
    if (numericValue.length > 8) {
      formattedValue =
        formattedValue.slice(0, 9) + '-' + formattedValue.slice(9);
    }
    if (numericValue.length > 12) {
      formattedValue =
        formattedValue.slice(0, 14) + '-' + formattedValue.slice(14);
    }

    setFormData((prev) => ({
      ...prev,
      cardNumber: formattedValue, // 화면 표시용 값
    }));
    setCardNumToSave(numericValue); // 저장용 값
  };

  const handleInputChange = (field) => (e) => {
    if (field === 'cardNumber') {
      handleCardNumChange(e); // 카드 번호 전용 처리
    } else {
      const { value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      setFormMessage((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(FORM_FIELDS).forEach((field) => {
      const { regex, errorMessage } = FORM_FIELDS[field];

      if (field === 'cardNumber') {
        if (!cardNumToSave) {
          errors[field] = EMPTY_CARDNUM_MESSAGE;
        }
      } else if (!formData[field]) {
        errors[field] = errorMessage.empty;
      } else if (regex && !regex.test(formData[field])) {
        errors[field] = errorMessage.invalid;
      }
    });

    if (!formData.selectedCardType) {
      errors.selectedCardType = FORM_FIELDS.selectedCardType.errorMessage.empty;
    }

    setFormMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const cardNumber = cardNumToSave;
    const updatedFormData = { ...formData, cardNumber };
    // api 전송
    console.log('data to send: ' + JSON.stringify(updatedFormData));
  };

  return (
    <FormBox onSubmit={handleSubmit}>
      <Box style={{ padding: '50px' }}>
        <Grid2 container rowSpacing={1} columnSpacing={4}>
          <Grid2 size={24}>
            <CommonInput
              placeholder={FORM_FIELDS.cardNumber.placeholder}
              text={FORM_FIELDS.cardNumber.text}
              value={formData.cardNumber}
              onChange={handleInputChange('cardNumber')}
              width="100%"
              maxLength={FORM_FIELDS.cardNumber.maxLength}
            />
            {formMessage.cardNumber && (
              <ValidationMessage
                text={formMessage.cardNumber}
                type="error"
                fontSize={theme.fontSize.small}
                $margin="0 5px"
              />
            )}
          </Grid2>

          {['cardPwd', 'cardValidity'].map((field) => (
            <Grid2 key={field} size={6}>
              <CommonInput
                type={FORM_FIELDS[field].type}
                placeholder={FORM_FIELDS[field].placeholder}
                text={FORM_FIELDS[field].text}
                value={formData[field]}
                onChange={handleInputChange(field)}
                width="100%"
                maxLength={FORM_FIELDS[field].maxLength}
              />
              {formMessage[field] && (
                <ValidationMessage
                  text={formMessage[field]}
                  type="error"
                  fontSize={theme.fontSize.small}
                  $margin="0 5px"
                />
              )}
            </Grid2>
          ))}

          <Grid2 size={6}>
            <CommonSelect
              text={FORM_FIELDS.selectedCardType.text}
              options={CARD_COMPANY_LIST}
              selectedValue={formData.selectedCardType}
              setSelectedValue={(value) =>
                handleInputChange('selectedCardType')({
                  target: { value },
                })
              }
              margin="0"
              labelColor="#4a4a4a"
              width="227.75px"
            />
            {formMessage.selectedCardType && (
              <ValidationMessage
                text={formMessage.selectedCardType}
                type="error"
                fontSize={theme.fontSize.small}
                $margin="0 5px"
              />
            )}
          </Grid2>

          <Grid2 size={6}>
            <CommonSelect
              text={FORM_FIELDS.selectedCardTitle.text}
              options={cardList.map((cardTitle) => ({
                value: cardTitle,
                label: cardTitle,
              }))}
              selectedValue={formData.selectedCardTitle}
              setSelectedValue={(value) =>
                handleInputChange('selectedCardTitle')({
                  target: { value },
                })
              }
              margin="0"
              labelColor="#4a4a4a"
              width="227.75px"
            />
            {formMessage.selectedCardType && (
              <ValidationMessage
                text={formMessage.selectedCardType}
                type="error"
                fontSize={theme.fontSize.small}
                $margin="0 5px"
              />
            )}
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
              onClick={handleSubmit}
            />
          </Grid2>
        </Grid2>
      </Box>
    </FormBox>
  );
};

export default CardRegFormBox;

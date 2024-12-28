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
  CARD_DUPLICATE_ERROR,
  CARD_REGEX_ERROR,
  CVC_REGEX_ERROR,
  EMPTY_CARDNUM_ERROR,
  EMPTY_CVC_ERROR,
  EMPTY_ENGNAME_ERROR,
  EMPTY_VALIDITY_ERROR,
  ENGNAME_REGEX_ERROR,
  VALIDITY_REGEX_ERROR,
} from '../../common/Message';

const FormBox = styled.form`
  width: 100%;
  border-radius: 5px;
  overflow-y: auto;
  background-color: ${(props) => props.background || '#EFF3FD'};
`;

const FORM_FIELDS = {
  cardNumber: {
    placeholder: '카드번호를 입력하세요 (-제외)',
    text: '카드번호',
    regex: /^\d{16}$/,
    errorMessage: {
      empty: EMPTY_CARDNUM_ERROR,
      invalid: CARD_REGEX_ERROR,
      duplicate: CARD_DUPLICATE_ERROR,
    },
  },
  cvc: {
    placeholder: '카드 뒷면 서명란 끝 3자리',
    text: 'CVC',
    regex: /^\d{3}$/,
    errorMessage: {
      empty: EMPTY_CVC_ERROR,
      invalid: CVC_REGEX_ERROR,
    },
  },
  cardValidity: {
    placeholder: '날짜를 입력하세요 (/제외)',
    text: '유효기간',
    regex: /^(0[1-9]|1[0-2])\d{2}$/,
    errorMessage: {
      empty: EMPTY_VALIDITY_ERROR,
      invalid: VALIDITY_REGEX_ERROR,
    },
  },
  englishName: {
    placeholder: '영문이름을 입력하세요',
    text: '영문이름',
    regex: /^[a-zA-Z\s]+$/,
    errorMessage: {
      empty: EMPTY_ENGNAME_ERROR,
      invalid: ENGNAME_REGEX_ERROR,
    },
  },
  selectedCardType: {
    text: '카드 선택',
    errorMessage: {
      empty: '카드를 선택해주세요.',
    },
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

  const [formMessage, setFormMessage] = useState({
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
    setFormMessage((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(FORM_FIELDS).forEach((field) => {
      const { regex, errorMessage } = FORM_FIELDS[field];

      if (!formData[field]) {
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
    // TODO: 백엔드 구축 후 카드 등록 로직 추가
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

          {['cvc', 'cardValidity', 'englishName'].map((field) => (
            <Grid2 key={field} size={6}>
              <CommonInput
                placeholder={FORM_FIELDS[field].placeholder}
                text={FORM_FIELDS[field].text}
                value={formData[field]}
                onChange={handleInputChange(field)}
                width="100%"
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
              options={CARD_LIST}
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

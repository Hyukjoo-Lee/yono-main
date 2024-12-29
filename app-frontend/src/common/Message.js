// 입력값 누락 관련
export const EMPTY_USERID_MESSAGE = '아이디를 입력하세요.';
export const EMPTY_EMAIL_MESSAGE = '이메일을 입력하세요.';
export const EMPTY_PASSWORD_MESSAGE = '비밀번호를 입력하세요.';
export const EMPTY_NAME_MESSAGE = '이름을 입력하세요.';
export const EMPTY_ADDRESS_MESSAGE = '주소를 등록하세요.';
export const EMPTY_DETAIL_ADDRESS_MESSAGE = '상세주소를 입력하세요.';

export const EMPTY_CARDNUM_MESSAGE = '카드번호를 입력하세요.';
export const EMPTY_CVC_MESSAGE = 'CVC를 입력하세요.';
export const EMPTY_VALIDITY_MESSAGE = '유효기간을 입력하세요.';
export const EMPTY_ENGNAME_MESSAGE = '영문이름을 입력하세요.';
export const EMPTY_CARDSELECT_MESSAGE = '영문이름을 입력하세요.';

export const EMPTY_EMAILCODE_MESSAGE = '인증 코드를 입력해주세요.';
// REGEX 관련
export const USERID_REGEX_MESSAGE =
  '아이디는 영문 소문자와 숫자로만 작성하며, 4~16자로 입력해주세요.';
export const EMAIL_REGEX_MESSAGE = '올바른 이메일 형식으로 입력해주세요.';
export const PASSWORD_REGEX_MESSAGE =
  '비밀번호는 소문자, 숫자, 특수문자(@#$%^&+=!)를 포함해 8자 이상으로 입력해주세요.';
export const NAME_REGEX_MESSAGE =
  '이름은 한글로 2자 이상, 10자 이하로 입력해주세요.';

export const CARD_REGEX_MESSAGE =
  '카드번호는 16자리 숫자만 입력하세요. 하이픈(-)은 제외해주세요.';
export const CVC_REGEX_MESSAGE =
  'CVC는 카드 뒷면 서명란 끝의 3자리 숫자를 입력하세요.';
export const VALIDITY_REGEX_MESSAGE = '유효기간은 MMYY 형식으로 입력하세요.';
export const ENGNAME_REGEX_MESSAGE = '영문 이름을 정확히 입력해주세요.';

// 일치 여부 관련
export const PASSWORD_MISMATCH_MESSAGE = '비밀번호가 일치하지 않습니다.';
export const USERID_VERIFIED_MESSAGE = '아이디를 확인해 주세요.';
export const PASSWORD_VERIFIED_MESSAGE = '비밀번호를 확인해 주세요.';

// 중복 확인 관련
export const USERID_DUPLICATE_MESSAGE = '이미 등록된 아이디입니다.';
export const USERID_AVAILABLE_MESSAGE = '사용 가능한 아이디입니다.';
export const USERID_VERIFY_PROMPT = '아이디 중복 확인을 해주세요.';
export const CARD_DUPLICATE_MESSAGE = '이미 등록된 카드입니다.';

// 서버 관련
export const SERVER_MESSAGE = '서버와의 통신 중 문제가 발생했습니다.';

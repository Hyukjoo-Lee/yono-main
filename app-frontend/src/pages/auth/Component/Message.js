// 입력값 누락 관련
export const EMPTY_USERID_ERROR = '아이디를 입력해주세요.';
export const EMPTY_EMAIL_ERROR = '이메일을 입력해주세요.';
export const EMPTY_PASSWORD_ERROR = '비밀번호를 입력해주세요.';
export const EMPTY_NAME_ERROR = '이름을 입력해주세요.';
export const EMPTY_ADDRESS_ERROR = '주소를 등록해주세요.';

// REGEX 관련
export const USERID_REGEX_ERROR =
  '아이디는 영문 소문자와 숫자로만 작성하며, 4~16자로 입력해주세요.';
export const EMAIL_REGEX_ERROR =
  '올바른 이메일 형식으로 입력해주세요. 예: example@domain.com';
export const PASSWORD_REGEX_ERROR =
  '비밀번호는 소문자, 숫자, 특수문자(@#$%^&+=!)를 포함해 8자 이상으로 입력해주세요.';

// 일치 여부 관련
export const PASSWORD_MISMATCH_ERROR = '비밀번호가 일치하지 않습니다.';
export const USERID_VERIFIED_ERROR = '아이디를 확인해 주세요.';
export const PASSWORD_VERIFIED_ERROR = '비밀번호를 확인해 주세요.';

// 중복 확인 관련
export const USERID_DUPLICATE_ERROR = '이미 등록된 아이디입니다.';
export const USERID_AVAILABLE_MESSAGE = '사용 가능한 아이디입니다.';
export const USERID_VERIFY_PROMPT = '아이디 중복 확인을 해주세요.';

// 서버 관련
export const SERVER_ERROR = '서버와의 통신 중 문제가 발생했습니다.';

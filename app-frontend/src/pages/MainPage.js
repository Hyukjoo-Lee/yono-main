import { ReactComponent as HandsClapping } from '../assets/images/HandsClapping.svg';
import CustomButton from '../common/CommonButton';
import CommonRoot from '../common/CommonRoot';
<<<<<<< HEAD
import CompeleteChangePw from './auth/CompeleteChangePw';
=======
>>>>>>> b48a4f7af3e821a10684252a3b7b3032e0d9ac25

export function MainPage() {
  return (
    <CommonRoot>
      {/* 테스팅 */}
      <CustomButton
        startIcon={<HandsClapping />}
        text="prop testing"
        fontSize="10px"
      />
<<<<<<< HEAD
      <CompeleteChangePw />
=======
>>>>>>> b48a4f7af3e821a10684252a3b7b3032e0d9ac25
    </CommonRoot>
  );
}

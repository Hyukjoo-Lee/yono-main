import CommonRoot from '../../common/CommonRoot';
import CommonPageInfo from '../../common/CommonPageInfo';
import CheckUserInfo from './CheckUserInfo';

export function MyPage() {
  const userInfo = {
    userName: '김지훈',
    userId: 'jihunID4024',
    originPassword: 'jihunPWD4024',
    email: 'jihunEmail@google.com',
    nickname: '지후니뱃살',
    Target_Expenditure_Amout: '500,000 원',
  };

  return (
    <CommonRoot>
      <CommonPageInfo title="마이 페이지" text={<p></p>} />
      <CheckUserInfo {...userInfo} />
    </CommonRoot>
  );
}

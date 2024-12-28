import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CheckUserInfo from './CheckUserInfo';

import { useState, useEffect } from 'react';
import { findUserById } from '../../apis/userApi';

export function MyPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userNum = 41; // 현재 로그인한 유저의 userNum
        const user = await findUserById(userNum);
        setUsers(user.data);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 오류 발생:', error);
        setUsers(null);
      }
    };

    fetchUser();
  }, []);

  const userInfo = users
    ? {
        userNum: users.userNum,
        userId: users.userId,
        password: users.password,
        email: users.email,
        name: users.name,
        address: users.address,
        spendingTarget: users.spendingTarget,
        profile: users.profile,
        createdAt: users.createdAt,
      }
    : null;

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <CommonRoot>
      <CommonPageInfo title="마이 페이지" text={<p></p>} />
      <CheckUserInfo {...userInfo} />
    </CommonRoot>
  );
}

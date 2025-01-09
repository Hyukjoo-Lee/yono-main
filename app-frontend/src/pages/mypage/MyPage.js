import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CheckUserInfo from './CheckUserInfo';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findUserById } from '../../apis/userApi';

export function MyPage() {
  const userNum = useSelector((state) => state.user.user?.userNum); // 현재 로그인한 유저의 userNum
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userNum) throw new Error('로그인된 유저가 없습니다.');
        const user = await findUserById(userNum);
        setUsers(user.data);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 오류 발생:', error);
        setUsers(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userNum]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users) {
    return <div>유저 정보를 불러오지 못 했습니다.</div>;
  }

  return (
    <CommonRoot>
      <CommonPageInfo title="마이 페이지" text={<p></p>} />
      <CheckUserInfo {...users} />
    </CommonRoot>
  );
}

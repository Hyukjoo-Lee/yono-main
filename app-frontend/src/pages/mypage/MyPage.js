import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CheckUserInfo from './CheckUserInfo';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findUserById } from '../../apis/userApi';
import CommonDialog from '../../common/CommonDialog';

export function MyPage() {
  const userNum = useSelector((state) => state.user.user?.userNum);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userNum) {
          setIsShowDialog(true);
        } else {
          const user = await findUserById(userNum);
          setUsers(user.data);
        }
      } catch (error) {
        setIsShowDialog(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userNum]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isShowDialog ? (
        <CommonDialog
          open={isShowDialog}
          onClick={() => navigate('/login')}
          onClose={() => navigate('/login')}
          submitText="로그인"
        >
          <p>로그인 정보가 없습니다. 로그인을 진행해주세요!</p>
        </CommonDialog>
      ) : (
        <CommonRoot>
          <CommonPageInfo title="마이 페이지" text={<p></p>} />
          <CheckUserInfo {...users} />
        </CommonRoot>
      )}
    </>
  );
}

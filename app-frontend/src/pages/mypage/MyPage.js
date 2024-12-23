import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CheckUserInfo from './CheckUserInfo';

import { useState, useEffect } from 'react';
import axios from 'axios';

export function MyPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get('/user/id')
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response || error.message));
  }, []);

  const userInfo = users
    ? {
        user_id: users.user_id,
        username: users.username,
        password: users.password,
        name: users.name,
        email: users.email,
        address: users.address,
        spending_target: users.spending_target,
        created_at: users.created_at,
      }
    : null;

  return (
    <CommonRoot>
      <CommonPageInfo title="마이 페이지" text={<p></p>} />
      <CheckUserInfo {...userInfo} />
    </CommonRoot>
  );
}

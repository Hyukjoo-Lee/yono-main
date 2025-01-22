import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Medal1 } from '../../../assets/images/Medal1.svg';
import { ReactComponent as Medal2 } from '../../../assets/images/Medal2.svg';
import { ReactComponent as Medal3 } from '../../../assets/images/Medal3.svg';
import { ReactComponent as Profile } from '../../../assets/images/Profile.svg';
import { fetchUserRanking } from '../../../apis/rankingApi';
import { findUserById } from '../../../apis/userApi';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const Root = styled.div`
  width: 100%;
`;

const BoxStyle = styled.div`
  width: 100%;
  border-radius: 7px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  overflow: hidden;
  & > div:nth-child(1) {
    background: ${(props) => props.theme.color.lightBlue} !important;
    & p {
      font-weight: bold !important;
      color: ${(props) => props.theme.color.gray} !important;
    }
  }
`;

const EmptyBox = styled(BoxStyle)`
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    margin: 0px;
    font-size: ${(props) => props.theme.fontSize.eighteen};
    color: ${(props) => props.theme.color.gray};
  }
`;

const LoadingBox = styled(EmptyBox)`
  flex-direction: column;
  & p {
    margin-top: 10px;
  }
`;

const BoxIn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 33px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.color.mediumGray};
`;
const BoxInStyle = styled.div`
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  & > div:nth-child(1),
  > div:nth-child(2),
  > div:nth-child(3) {
    & p {
      font-weight: bold;
      color: ${(props) => props.theme.color.blue};
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const MedalBox = styled.div`
  min-width: 50px;
`;

const TextStyle = styled.p`
  min-width: 50px;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.color.gray};
  margin: 0px;
`;

const NumberText = styled(TextStyle)`
  text-align: right;
`;

const ProfileBox = styled.div`
  width: 45px;
  height: 45px;
  border: 1px solid ${(props) => props.theme.color.brightGray};
  border-radius: 50%;
  margin: 0 10px;
  overflow: hidden;
  background: ${(props) => props.theme.color.brightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & svg {
    width: 30px;
    height: 30px;
  }
`;

const RankingTable = () => {
  const isLoggedIn = useSelector((state) => state.user.user?.userNum); // 현재 로그인한 유저의 userNum
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [users, setUsers] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isLoggedIn) {
          console.log('로그인 정보가 없습니다.');
        } else {
          const user = await findUserById(isLoggedIn);
          setUsers(user.data);
        }
      } catch (error) {
        console.log('유저 정보가 없습니다.');
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    const getRanking = async () => {
      setIsLoading(true); // 데이터 로드 시작 시 로딩 상태 true
      try {
        const data = await fetchUserRanking(); // API 호출
        const sortedList = data.sort((a, b) => b.badge - a.badge); // badge 기준 내림차순 정렬
        // 로그인한 사용자의 userNum과 일치하는 데이터만 필터링
        const filteredData = data.filter((item) => item.userNum === isLoggedIn);
        setUserList(filteredData); // 로그인한 사용자 데이터 저장
        setList(sortedList); // 정렬된 데이터 상태로 저장
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 false
      }
    };

    getRanking();
  }, [isLoggedIn, users]);

  return (
    <Root>
      {isLoading ? (
        <LoadingBox>
          <CircularProgress />
          <p>데이터 불러오는 중...</p>
        </LoadingBox>
      ) : list.length === 0 ? (
        <EmptyBox>
          <p>
            아직 집계된 데이터가 없습니다. (정해진 날짜가 지나지 않아 데이터가
            업데이트되지 않았습니다.)
          </p>
        </EmptyBox>
      ) : (
        <BoxStyle>
          <BoxIn>
            <TextBox>
              <TextStyle>{userList[0]?.badgeNum}</TextStyle>
              <ProfileBox>
                {userList[0]?.profile !== 'temp_profile' ? (
                  <img
                    src={`http://localhost:8065${userList[0]?.profile}`}
                    alt={userList[0]?.name}
                  />
                ) : (
                  <Profile />
                )}
              </ProfileBox>
              <TextStyle>
                {userList[0]?.name}({userList[0]?.userId})
              </TextStyle>
            </TextBox>
            <NumberText>{userList[0]?.badge}</NumberText>
          </BoxIn>
          <BoxInStyle>
            {list.map((item, index) => (
              <BoxIn key={index}>
                <TextBox>
                  {index === 0 ? (
                    <MedalBox>
                      <Medal1 />
                    </MedalBox>
                  ) : index === 1 ? (
                    <MedalBox>
                      <Medal2 />
                    </MedalBox>
                  ) : index === 2 ? (
                    <MedalBox>
                      <Medal3 />
                    </MedalBox>
                  ) : (
                    <TextStyle>{index + 1}</TextStyle>
                  )}

                  <ProfileBox>
                    {item.profile !== 'temp_profile' ? (
                      <img
                        src={`http://localhost:8065${item.profile}`}
                        alt={item.name}
                      />
                    ) : (
                      <Profile />
                    )}
                  </ProfileBox>
                  <TextStyle>
                    {item.name}({item.userId})
                  </TextStyle>
                </TextBox>
                <NumberText>{item.badge.toLocaleString()}</NumberText>
              </BoxIn>
            ))}
          </BoxInStyle>
        </BoxStyle>
      )}
    </Root>
  );
};
export default RankingTable;

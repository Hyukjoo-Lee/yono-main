import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Medal1 } from '../../../assets/images/Medal1.svg';
import { ReactComponent as Medal2 } from '../../../assets/images/Medal2.svg';
import { ReactComponent as Medal3 } from '../../../assets/images/Medal3.svg';
import { ReactComponent as Profile } from '../../../assets/images/Profile.svg';
import CommonLoading from '../../../common/CommonLoading';

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

const LoadingBox = styled.div`
  padding: 40px;
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
`;

const BoxIn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 33px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.color.mediumGray};
`;

const UserBoxIn = styled(BoxIn)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 33px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.color.mediumGray};
  background: ${(props) => props.theme.color.lightBlue} !important;
  & p {
    font-weight: bold !important;
    color: ${(props) => props.theme.color.gray} !important;
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

const TextStyleBold = styled(TextStyle)`
  font-weight: bold;
  color: ${(props) => props.theme.color.blue};
`;

const NumberText = styled(TextStyle)`
  text-align: right;
`;

const NumberTextBold = styled(NumberText)`
  font-weight: bold;
  color: ${(props) => props.theme.color.blue};
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

const RankingTable = ({
  isLoggedIn,
  userRanking,
  rankingList,
  maskName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortedRanking, setSortedRanking] = useState([]);

  useEffect(() => {
    if (rankingList.length > 0) {
      setSortedRanking(rankingList);
    }
    setIsLoading(false);
  }, [isLoggedIn, rankingList]);

  return (
    <Root>
      {isLoading ? (
        <LoadingBox>
          <CommonLoading />
        </LoadingBox>
      ) : rankingList.length === 0 ? (
        <EmptyBox>
          <p>
            아직 집계된 데이터가 없습니다. (정해진 날짜가 지나지 않아 데이터가
            업데이트되지 않았습니다.)
          </p>
        </EmptyBox>
      ) : (
        <BoxStyle>
          {userRanking && (
            <UserBoxIn>
              <TextBox>
                <TextStyle>{userRanking.ranking}</TextStyle>
                <ProfileBox>
                  {userRanking.profile !== 'temp_profile' ? (
                    <img
                      src={`http://localhost:8065${userRanking.profile}`}
                      alt={maskName(userRanking.name)}
                    />
                  ) : (
                    <Profile />
                  )}
                </ProfileBox>
                <TextStyle>
                  {maskName(userRanking.name)}({userRanking.userId})
                </TextStyle>
              </TextBox>
              <NumberText>{userRanking.badge.toLocaleString()}개</NumberText>
            </UserBoxIn>
          )}
          <BoxInStyle>
            {sortedRanking.map((item, index) => (
              <BoxIn key={index}>
                <TextBox>
                  {item.ranking === 1 ? (
                    <MedalBox>
                      <Medal1 />
                    </MedalBox>
                  ) : item.ranking === 2 ? (
                    <MedalBox>
                      <Medal2 />
                    </MedalBox>
                  ) : item.ranking === 3 ? (
                    <MedalBox>
                      <Medal3 />
                    </MedalBox>
                  ) : (
                    <TextStyle>{item.ranking}</TextStyle>
                  )}

                  <ProfileBox>
                    {item.profile !== 'temp_profile' ? (
                      <img
                        src={`http://localhost:8065${item.profile}`}
                        alt={maskName(item.name)}
                      />
                    ) : (
                      <Profile />
                    )}
                  </ProfileBox>
                  {item.ranking === 1 ||
                  item.ranking === 2 ||
                  item.ranking === 3 ? (
                    <TextStyleBold>
                      {maskName(item.name)}({item.userId})
                    </TextStyleBold>
                  ) : (
                    <TextStyle>
                      {maskName(item.name)}({item.userId})
                    </TextStyle>
                  )}
                </TextBox>
                {item.ranking === 1 ||
                item.ranking === 2 ||
                item.ranking === 3 ? (
                  <NumberTextBold>
                    {item.badge.toLocaleString()}개
                  </NumberTextBold>
                ) : (
                  <NumberText>{item.badge.toLocaleString()}개</NumberText>
                )}
              </BoxIn>
            ))}
          </BoxInStyle>
        </BoxStyle>
      )}
    </Root>
  );
};
export default RankingTable;

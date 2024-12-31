import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/images/Logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userAction';

const Nav = styled.nav`
  position: fixed;
  background: ${(props) => props.theme.color.white};
  width: 100%;
  padding: 25px 0px;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  justify-content: center;
`;

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  box-sizing: border-box;
`;

const TopListBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.color.gray};
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: 500;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    background-color: transparent;
    color: ${(props) => props.theme.color.blue};
  }

  &:active {
    background-color: transparent;
  }
`;

const LineStyle = styled.p`
  margin: 0px 10px;
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.color.gray};
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const MenuList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const MenuStyledLink = styled(Link)`
  color: ${(props) => props.theme.color.black};
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: medium;
  padding: 0 25px;

  &:hover {
    background-color: transparent;
    color: ${(props) => props.theme.color.blue};
  }

  &:active {
    background-color: transparent;
  }

  &:last-child {
    padding-right: 0px;
  }
`;

const StyledText = styled.div`
  color: ${(props) => props.theme.color.gray};
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: 500;
  margin: 0px 10px;
`;

export function MainHeader() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const list = isLoggedIn
    ? [
        { label: `${user?.name || '사용자'}님`, isText: true },
        { label: '로그아웃', path: '/', onClick: handleLogout },
        { label: '마이페이지', path: '/mypage' },
      ]
    : [
        { label: '로그인', path: '/login' },
        { label: '회원가입', path: '/signup' },
        { label: '마이페이지', path: '/mypage' },
      ];

  const menuList = [
    { label: 'YONO', path: '/intro' },
    { label: '소비챌린지', path: '/card-challege' },
    { label: '소비패턴분석', path: '/card-analysis' },
    { label: '마이카드', path: '/mycard' },
    { label: '커뮤니티', path: '/community' },
  ];

  return (
    <Nav>
      <RootIn>
        <TopListBox>
          {list.map((item, index) =>
            item.isText ? (
              <StyledText key={index}>{item.label} &nbsp; | </StyledText>
            ) : (
              <StyledLink
                to={item.path}
                key={index}
                onClick={item.onClick || null}
              >
                {item.label}
                {index !== list.length - 1 && <LineStyle>|</LineStyle>}
              </StyledLink>
            ),
          )}
        </TopListBox>
        <MenuList>
          <LogoLink to="/">
            <Logo />
          </LogoLink>
          <MenuBox>
            {menuList.map((item, index) => (
              <MenuStyledLink to={item.path} key={index}>
                {item.label}
              </MenuStyledLink>
            ))}
          </MenuBox>
        </MenuList>
      </RootIn>
    </Nav>
  );
}

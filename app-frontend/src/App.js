import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import Footer from './common/Footer';
import { MainHeader } from './common/MainHeader';

import { ThemeProvider } from 'styled-components';
import { FindID } from './pages/auth/FindID';
import { FindPassword } from './pages/auth/FindPassword';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import CardAnalysis from './pages/cardAnalysis/CardAnalysis';
import { CardChallege } from './pages/cardChallege/CardChallege';
import { Community } from './pages/community/Community';
import { CommunityFormBox } from './pages/community/CommunityFormBox';
import { Intro } from './pages/intro/Intro';
import { MainPage } from './pages/main/MainPage';
import { MyCard } from './pages/mycard/MyCard';
import { MyPage } from './pages/mypage/MyPage';
import theme from './theme/theme';
const Root = styled.div`
  & *,
  p {
    font-family: 'Noto Sans KR';
  }
`;

function Layout({ children }) {
  return (
    <Root>
      <MainHeader />
      {children}
      <Footer />
    </Root>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/find-id" element={<FindID />} />
            <Route path="/find-pwd" element={<FindPassword />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/card-challege" element={<CardChallege />} />
            <Route path="/card-analysis" element={<CardAnalysis />} />
            <Route path="/community" element={<Community />} />
            <Route path="/CommunityFormBox" element={<CommunityFormBox />} />
            <Route path="/mycard" element={<MyCard />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { MainHeader } from './common/MainHeader';
import Footer from './common/Footer';

import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { MainPage } from './pages/MainPage';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { FindID } from './pages/auth/FindID';
import { MyPage } from './pages/mypage/MyPage';
import { FindPassword } from './pages/auth/FindPassword';
import { Intro } from './pages/intro/Intro';
import { CardChallege } from './pages/cardChallege/CardChallege';
import CardAnalysis from './pages/cardAnalysis/CardAnalysis';
import { Community } from './pages/community/Community';
import { CommunityFormBox } from './pages/community/CommunityFormBox';
import { MyCard } from './pages/mycard/MyCard';
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

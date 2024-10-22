import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { FindID } from "./pages/FindID";
import { FindPassword } from "./pages/FindPassword";
import { Intro } from "./pages/Intro";
import { CardChallege } from "./pages/CardChallege";
import { CardAnalysis } from "./pages/CardAnalysis";
import { Community } from "./pages/Community";
import { MyCard } from "./pages/MyCard";
import { MyPage } from "./pages/MyPage";
import { MainPage } from "./pages/MainPage";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";

// 메인 페이지 헤더1 - 로그인, 회원가입, 마이페이지, 아이디찾기, 비번찾기
// 메인 페이지 헤더2 - 미클머클소개, 카드챌린지, 소비패턴분석, 커뮤니티, 마이카드
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
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
          <Route path="/community" element={<Community />} /> {/* 철자 수정 */}
          <Route path="/mycard" element={<MyCard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

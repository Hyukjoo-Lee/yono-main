import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import IntroGIF from '../../assets/images/main.gif';
import CommonRoot from '../../common/CommonRoot';

const Root = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'currentPage',
})`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.headerHeight});
  overflow: hidden;
`;

// background-color: ${({ $currentPage }) =>
//   $currentPage % 2 === 0 ? 'white' : '#EFF3FD'};

const PagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.8s ease;
  transform: ${({ currentPage }) => `translateY(-${currentPage * 100}vh)`};
`;

const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GIFWrap = styled.div`
  & img {
    width: 687px;
    height: 416px;
  }
`;

const TextWrap = styled.div`
  & p:first-child {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & p:last-child {
    font-size: 16px;
    color: #757575;
  }
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 416px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export function Intro() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  const handleScroll = useCallback(
    (e) => {
      if (e.deltaY > 0 && currentPage < 4) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    },
    [currentPage],
  );

  useEffect(() => {
    window.scrollTo({
      top: currentPage * pageHeight,
      behavior: 'smooth',
    });
  }, [currentPage, pageHeight]);

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Root>
      {/* currentPage={currentPage} */}
      <CommonRoot>
        <PagesWrapper>
          {/* 첫 번째 페이지 */}
          <Page>
            <ContentWrap>
              <GIFWrap>
                <img src={IntroGIF} alt="main GIF" />
              </GIFWrap>
              <TextWrap>
                <p>
                  사용자 경험을 극대화하며 실생활에 <br />
                  유용한 혁신적인 웹앱 플랫폼
                </p>
                <p>
                  최근 모바일 사용의 증가에 발맞추어, 사용자들이 더욱 친숙하게
                  접근할 <br />수 있도록 웹앱 형태로 개발되었습니다. 이를 통해
                  언제 어디서나 편리하게 사용할 수 있는 환경을 제공하며, 보다
                  직관적이고 만족스러운 사용자 경험을 선사하고자 끈임없이
                  노력하고 있습니다.
                </p>
              </TextWrap>
            </ContentWrap>
          </Page>
          {/* 두 번째 페이지 */}
          <Page>
            <ContentWrap>
              <GIFWrap>
                <img src={IntroGIF} alt="main GIF" />
              </GIFWrap>
              <TextWrap>
                <p>
                  카드 챌린지를 활용한 경쟁적 절약
                  <br />
                  재미와 동기를 더한 소비 관리 방식
                </p>
                <p>
                  혼자서 절약을 실천하는 것보다, 사용자 간의 경쟁을 통해 더 큰
                  동기와 재미를
                  <br />
                  제공할 수 있도록 카드 챌린지 기능을 도입했습니다. 유저들이
                  서로의 절약 성과를 비교하고, 목표 달성을 통해 뱃지를
                  획득하거나 순위를 확인 할<br />수 있도록 설계되었습니다.
                </p>
              </TextWrap>
            </ContentWrap>
          </Page>
        </PagesWrapper>
      </CommonRoot>
    </Root>
  );
}

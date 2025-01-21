import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoSample from '../../assets/images/infoSample.png';
import InfoSample2 from '../../assets/images/mainsample.gif';
import IntroGIF from './IntroGIF';

const Root = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const CommonRoot = styled.div``;

const PagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.8s ease;
  transform: ${({ $currentPage }) => `translateY(-${$currentPage * 100}vh)`};
  border: 1px solid black;
`;

const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 416px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
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

  &:nth-of-type(odd) {
    text-align: right;
  }
`;

export function Intro() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  // const [pageHeight, setPageHeight] = useState(window.innerHeight);

  const handleScroll = useCallback(
    (e) => {
      if (isScrolling) return;
      setIsScrolling(true);

      if (e.deltaY > 0 && currentPage < 4) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
      setTimeout(() => setIsScrolling(false), 800);
    },
    [currentPage, isScrolling],
  );

  useEffect(() => {
    const handleResize = () => {
      window.scrollTo({
        top: currentPage * window.innerHeight,
        behavior: 'smooth',
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Root>
      <CommonRoot>
        <PagesWrapper $currentPage={currentPage}>
          {/* 첫 번째 페이지 */}
          <Page>
            <ContentWrap>
              <GIFWrap>
                <IntroGIF src={InfoSample2} alt="Intro GIF" duration={4000} />
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
          <Page style={{ backgroundColor: '#EFF3FD' }}>
            <ContentWrap>
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
                  제공할 수 있도록 카드 챌린지 기능을 도입했습니다. 사용자들이
                  서로의 절약 성과를 비교하고, 목표 달성을 통해 뱃지를
                  획득하거나 순위를 확인 할<br />수 있도록 설계되었습니다.
                </p>
              </TextWrap>
              <GIFWrap>
                <img src={InfoSample} alt="main GIF" />
              </GIFWrap>
            </ContentWrap>
          </Page>
          {/* 세 번째 페이지 */}
          <Page>
            <ContentWrap>
              <GIFWrap>
                <img src={InfoSample} alt="main GIF" />
              </GIFWrap>
              <TextWrap>
                <p>
                  소비 패턴을 분석해 지출 파악하고,
                  <br />더 나은 소비 관리를 위한 통찰 제공
                </p>
                <p>
                  소비 내역을 일별, 월별 그리고 카테고리별로 체계적으로 분석하여
                  유저들
                  <br />이 자신의 소비패턴을 보다 명확하고 쉽게 이해 할 수
                  있도록 설계했습니다.
                  <br /> 이를 통해 사용자는 자신의 소비 습관을 구체적으로
                  파악하고, 보다 효과적으로 절약을 실천 할 수 있습니다.
                </p>
              </TextWrap>
            </ContentWrap>
          </Page>
          {/* 네 번째 페이지 */}
          <Page style={{ backgroundColor: '#EFF3FD' }}>
            <ContentWrap>
              <TextWrap>
                <p>
                  카드 추천을 통해 절약 카드를
                  <br />
                  알아보고 현명한 소비 관리 시작하기
                </p>
                <p>
                  사용자가 실제로 사용하는 카드의 소비 내역을 분석하여, 그에
                  맞는 맞춤형
                  <br />
                  절약카드를 추천합니다. 카드 사용 패턴과 소비 습관을 파악한 후,
                  가장 유<br />
                  리한 혜택을 제공하는 카드를 제시함으로써, 매일의 지출을 줄일
                  수 있는 최<br />
                  적의 선택을 도와드립니다. 대중교통, 외식, 쇼핑 등 다양한
                  분야에서 실질
                  <br />
                  적인 할인 혜택을 받을 수 있는 카드를 추천하여, 사용자는 필요
                  없는 지출
                  <br />
                  을 줄이고 더 똑똑한 소비를 실현 할 수 있습니다. 이를 통해 절약
                  효과를
                  <br />
                  극대화하고, 장기적인 재정 관리를 돕는 카드 선택을 지원합니다.
                </p>
              </TextWrap>
              <GIFWrap>
                <img src={InfoSample} alt="main GIF" />
              </GIFWrap>
            </ContentWrap>
          </Page>
          {/* 다섯 번째 페이지 */}
          <Page>
            <ContentWrap>
              <GIFWrap>
                <img src={InfoSample} alt="main GIF" />
              </GIFWrap>
              <TextWrap>
                <p>
                  효율적인 절약 팁을 공유하며,
                  <br />더 똑똑한 소비를 유도하는 커뮤니티
                </p>
                <p>
                  똑똑하게 소비할 수 있도록 다양한 절약 팁과 방법을 공유합니다.
                  이를 통해
                  <br />
                  일상적인 지출에서 작은 절약을 실천할 수 있는 아이디어를
                  제공하고, 사용자
                  <br />
                  들이 목표를 달성할 수 있도록 돕습니다. 사용자들끼리 카드
                  사용에 맞춘 효<br />
                  율적인 절약 방법을 공유하고, 적절한 할인 혜택과 소비 습관에
                  맞는 팁을
                  <br />
                  제공하여 실제로 지출을 줄이는데 실질적인 도움이 되도록 합니다.
                </p>
              </TextWrap>
            </ContentWrap>
          </Page>
        </PagesWrapper>
      </CommonRoot>
    </Root>
  );
}

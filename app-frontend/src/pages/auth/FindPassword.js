import styled from "styled-components";

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
`;

export function FindPassword() {
  return (
    <Root>
      <h1>비밀번호찾기</h1>
    </Root>
  );
}

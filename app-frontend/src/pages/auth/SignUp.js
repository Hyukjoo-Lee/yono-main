import styled from "styled-components";

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
`;

export function SignUp() {
  return (
    <Root>
      <h1>회원가입</h1>
    </Root>
  );
}

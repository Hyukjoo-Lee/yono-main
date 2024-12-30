import styled from 'styled-components';
import theme from '../theme/theme';

const MessageBox = styled.div`
  margin: ${(props) => props.$margin || '0px'};
`;

const MessageText = styled.p`
  margin: 0;
  color: ${(props) =>
    props.type === 'error'
      ? props.textColor || theme.color.red
      : props.textColor || theme.color.blue};
  font-size: ${(props) => props.fontSize || theme.fontSize.xs};
`;

const ValidationMessage = ({
  text,
  type = 'error',
  $margin = '0px',
  fontSize,
  textColor,
}) => {
  return (
    <MessageBox $margin={$margin}>
      <MessageText type={type} fontSize={fontSize} textColor={textColor}>
        {text}
      </MessageText>
    </MessageBox>
  );
};

export default ValidationMessage;

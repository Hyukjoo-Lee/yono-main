import styled from 'styled-components';

const StyledHr = styled.hr`
  width: ${(props) => props.$width || '100%'};
  border: none;
  border-top: ${(props) => props.$borderWidth || '1px'} solid
    ${(props) => props.$borderColor || '#e0e0e0'};
  margin: ${(props) => props.$margin || '10px 5px 10px 5px'};
`;

const CommonHr = ({ width, borderWidth, borderColor, margin }) => {
  return (
    <StyledHr
      $width={width}
      $borderWidth={borderWidth}
      $borderColor={borderColor}
      $margin={margin}
    />
  );
};

export default CommonHr;

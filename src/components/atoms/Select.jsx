import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function Select(props) {
  return <StyledSelect {...props} />;
}

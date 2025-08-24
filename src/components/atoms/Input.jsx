import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}

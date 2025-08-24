import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function TextArea(props) {
  return <StyledTextArea {...props} />;
}

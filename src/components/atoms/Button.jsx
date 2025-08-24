import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${(p) => p.theme.primary};
  color: #fff;
  cursor: pointer;
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

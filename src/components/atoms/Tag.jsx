import styled from 'styled-components';

const Wrapper = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${(p) => p.theme.primary};
  border-radius: 4px;
  font-size: 0.75rem;
`;

export default function Tag({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

import styled from 'styled-components';

const Wrapper = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: ${(p) => p.theme.primary};
  color: #fff;
  border-radius: 4px;
  font-size: 0.75rem;
`;

export default function Badge({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

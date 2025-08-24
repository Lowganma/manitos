import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

export default function EmptyState({ message }) {
  return <Wrapper>{message}</Wrapper>;
}

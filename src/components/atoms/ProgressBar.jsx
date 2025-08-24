import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background: #e5e7eb;
  border-radius: 4px;
`;

const Bar = styled.div`
  height: 8px;
  background: ${(p) => p.theme.primary};
  border-radius: 4px;
  width: ${(p) => p.value}%;
`;

export default function ProgressBar({ value }) {
  return (
    <Wrapper>
      <Bar value={value} />
    </Wrapper>
  );
}

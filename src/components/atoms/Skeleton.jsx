import styled from 'styled-components';

const SkeletonBox = styled.div`
  background: #e5e7eb;
  border-radius: 4px;
  width: ${(p) => p.width || '100%'};
  height: ${(p) => p.height || '1rem'};
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

export default function Skeleton(props) {
  return <SkeletonBox {...props} />;
}

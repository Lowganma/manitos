import styled from 'styled-components';

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export default function Avatar({ src, alt }) {
  return <Img src={src} alt={alt} />;
}

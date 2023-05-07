import errorImage from '../img/pngwing.com.png';

import { Container, Img, Text } from './ErrorData.styled';

export const ErrorData = () => {
  return (
    <Container role="alert">
      <Img src={errorImage} alt="errorData" width="800" />
      <Text>Reload the page or try again later!</Text>
    </Container>
  );
};

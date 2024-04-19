import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router';
import routes from './routes';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={routes}/>
    </ChakraProvider>
  );
}

export default App;

import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router';
import routes from './routes';
import theme from './theme';
import { AuthProvider } from './context/auth_context';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={routes}/>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

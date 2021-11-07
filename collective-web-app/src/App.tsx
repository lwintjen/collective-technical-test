import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRoutes } from 'react-router-dom';
import routes from './router/routes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

console.log(darkTheme);

const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProvider theme={darkTheme}>
      {content}
    </ThemeProvider>
  );
};

export default App;

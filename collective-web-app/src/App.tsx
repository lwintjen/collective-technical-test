import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import routes from './router/routes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};

export default App;

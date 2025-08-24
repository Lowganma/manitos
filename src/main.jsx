import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import { lightTheme } from './theme/light';
import { darkTheme } from './theme/dark';
import { useUIStore } from './stores/ui.store';
import App from './App';
import { useAuthStore } from './stores/auth.store';

const queryClient = new QueryClient();

function Root() {
  const themeName = useUIStore((s) => s.theme);
  const theme = themeName === 'dark' ? darkTheme : lightTheme;
  React.useEffect(() => {
    useAuthStore.getState().init();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

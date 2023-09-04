
import type { AppProps } from 'next/app';
import { DataProvider } from '../context/DataContext'; // Ajusta esta ruta al lugar donde tienes tu archivo DataContext.tsx

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default MyApp;

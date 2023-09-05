import type { AppProps } from "next/app";
import { DataProvider } from "../context/DataContext";
import Navbar from "../components/Navbar";
import '../styles/styles.css'
import 'font-awesome/css/font-awesome.min.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Navbar />
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default MyApp;

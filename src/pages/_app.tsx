import type { AppProps } from "next/app";
import * as S from "../styles/pages/app";
import { globalStyles } from "../styles/global";
import { TransactionsContextProvider } from "../contexts/TransactionsContext";
import "react-toastify/dist/ReactToastify.css";

globalStyles();

import { AuthContextProvider } from "../contexts/AuthContext";
import { Aside } from "../components/Aside";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <S.AppContainer>
        <AuthContextProvider>
          <TransactionsContextProvider>
            <Aside />
            <S.StyledToastContainer />
            <Component {...pageProps} />
          </TransactionsContextProvider>
        </AuthContextProvider>
      </S.AppContainer>
    </>
  );
}

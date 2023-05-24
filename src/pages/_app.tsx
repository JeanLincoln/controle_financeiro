import type { AppProps } from "next/app";
import * as P from "phosphor-react";
import * as S from "../styles/pages/app";
import { globalStyles } from "../styles/global";
import Image from "next/image";
import { TransactionsContextProvider } from "../contexts/TransactionsContext";
import "react-toastify/dist/ReactToastify.css";

globalStyles();

import userImage from "../assets/images/jean.jpeg";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <S.AppContainer>
        <S.AsideContainer>
          <S.LogoContainer>
            <Link href="/">
              <P.Coins size={32} />
              <h1>Controle Financeiro</h1>
            </Link>
          </S.LogoContainer>
          <S.LinksContainer>
            <S.LinkGroup>
              <Link href="/Fixos">
                <P.Infinity size={25} color="#b37400" />
                <h3>Fixos</h3>
              </Link>
            </S.LinkGroup>
            <S.LinkGroup>
              <Link href="/Entradas">
                <P.ArrowCircleUp size={25} color="#00b37e" />
                <h3>Entradas</h3>
              </Link>
            </S.LinkGroup>
            <S.LinkGroup>
              <Link href="/Saidas">
                <P.ArrowCircleDown size={25} color="#f75a68" />
                <h3>Saídas</h3>
              </Link>
            </S.LinkGroup>
            {/* <S.LinkGroup>
              <Link href="/investimentos">
                <P.ChartLineUp size={25} color="#5abdf7" />
                <h3>Investimentos</h3>
              </Link>
            </S.LinkGroup> */}
          </S.LinksContainer>
          <S.UserContainer>
            <Image src={userImage} alt="a user image" width={50} height={50} />
            <strong>Jean Lincoln</strong>
          </S.UserContainer>
        </S.AsideContainer>
        <TransactionsContextProvider>
          <S.StyledToastContainer />
          <Component {...pageProps} />
        </TransactionsContextProvider>
      </S.AppContainer>
    </>
  );
}

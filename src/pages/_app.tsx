import type { AppProps } from 'next/app';
import * as P from 'phosphor-react';
import * as S from '../styles/pages/app';
import { globalStyles } from '../styles/global';
import Image from 'next/image';
import { TransactionsContextProvider } from '../contexts/TransactionsContext';

globalStyles();

import userImage from '../assets/images/jean.jpeg';
import Link from 'next/link';

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
              <P.ArrowCircleUp size={25} color="#00b37e" />
              <Link href="/Entradas">
                <h3>Entradas</h3>
              </Link>
            </S.LinkGroup>
            <S.LinkGroup>
              <P.ArrowCircleDown size={25} color="#f75a68" />
              <Link href="/Saidas">
                <h3>Saídas</h3>
              </Link>
            </S.LinkGroup>
            <S.LinkGroup>
              <P.CurrencyDollar size={25} color="#5abdf7" />
              <Link href="/investimentos">
                <h3>Investimentos</h3>
              </Link>
            </S.LinkGroup>
          </S.LinksContainer>
          <S.UserContainer>
            <Image src={userImage} alt="a user image" width={50} height={50} />
            <strong>Jean Lincoln</strong>
          </S.UserContainer>
        </S.AsideContainer>
        <TransactionsContextProvider>
          <Component {...pageProps} />
        </TransactionsContextProvider>
      </S.AppContainer>
    </>
  );
}

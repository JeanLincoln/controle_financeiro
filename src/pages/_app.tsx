import type { AppProps } from 'next/app';
import * as P from 'phosphor-react';
import * as S from '../styles/pages/app';
import { globalStyles } from '../styles/global';
import Image from 'next/image';

globalStyles();

import userImage from '../assets/images/jean.jpeg';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <S.Header>
        <S.LogoContainer>
          <P.Coins size={40} />
          <h1>Controle Financeiro</h1>
        </S.LogoContainer>
        <S.LinksContainer>
          <Link href="/">Página principal</Link>
          <Link href="/valoresDeEntrada">Valores de entrada</Link>
          <Link href="/valoresDeSaida">Valores de saída</Link>
          <Link href="/investimentos">Investimentos</Link>
        </S.LinksContainer>
        <S.UserContainer>
          <Image src={userImage} alt="a user image" width={50} height={50} />
          <strong>Jean Lincoln</strong>
        </S.UserContainer>
      </S.Header>
      <Component {...pageProps} />
    </>
  );
}

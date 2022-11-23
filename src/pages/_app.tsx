import type { AppProps } from 'next/app';
import * as P from 'phosphor-react';
import * as S from '../styles/pages/app';
import { globalStyles } from '../styles/global';
import Image from 'next/image';

globalStyles();

import userImage from '../assets/images/jean.jpeg';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <S.Header>
        <S.LogoContainer>
          <P.Coins size={40} />
          <h1>Controle Financeiro</h1>
        </S.LogoContainer>
        <S.LinksContainer>
          <li>Página principal</li>
          <li>Valores de entrada</li>
          <li>Valores de saída</li>
          <li>Investimentos</li>
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

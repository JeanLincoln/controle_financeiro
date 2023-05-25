import * as S from "../styles/pages/Login";
import * as P from "phosphor-react";
import Image from "next/image";

import googleImage from "../assets/images/google.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import router from "next/router";

export default function Login() {
  const { authentication } = useContext(AuthContext);

  return (
    <S.AuthContainer>
      <S.Content>
        <P.Coins size={70} />
        <h1>Gerenciamento Financeiro</h1>

        <button onClick={authentication}>
          <Image src={googleImage} alt="Logo da google" /> Entre com o Google!
        </button>
        <h2>Por favor, realize o login para entrar no site!</h2>
      </S.Content>
    </S.AuthContainer>
  );
}

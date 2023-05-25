import * as S from "../../styles/components/Aside";

import userImage from "../../assets/images/jean.jpeg";
import * as P from "phosphor-react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export function Aside({ children }: any) {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      {user && (
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
            <Image
              src={user.photoURL}
              alt="a user image"
              width={50}
              height={50}
            />
            <strong>{user.displayName}</strong>
          </S.UserContainer>
        </S.AsideContainer>
      )}
    </>
  );
}

import { useContext, useEffect } from "react";
import Charts from "../components/Charts";
import Summary from "../components/Summary";
import * as S from "../styles/pages/index";
import { AuthContext } from "../contexts/AuthContext";
import { redirect } from "next/navigation";
import router from "next/router";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <S.Container>
      <Summary />
      <Charts />
    </S.Container>
  );
}

import Charts from "../components/Charts";

import Summary from "../components/Summary";
import * as S from "../styles/pages/index";

export default function Home() {
  return (
    <S.Container>
      <Summary />
      <Charts />
    </S.Container>
  );
}

import Image from "next/image";
import * as S from "../../styles/components/Icons";
import cadernoAnimado from "./../../assets/images/caderno.gif";
import caderno from "./../../assets/images/caderno.svg";
import { useState } from "react";

export const Pencil = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <S.ImageContainer
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {hovered ? (
        <Image src={cadernoAnimado} alt="a user image" width={40} height={40} />
      ) : (
        <Image
          className="static"
          src={caderno}
          alt="a user image"
          width={30}
          height={30}
        />
      )}
    </S.ImageContainer>
  );
};

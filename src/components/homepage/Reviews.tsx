import React, { useState } from "react";
import styled from "styled-components";
import ArrowButton from "../shared/ArrowButton";
import { StaticImage } from "gatsby-plugin-image";
import { TittleH3 } from "../styles/styles.styled";
import { ReactComponent as Star } from "./Icons/star.svg";

const ReviewHolder = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Box = styled.div<any>`
  width: 50%;
  /* max-height: 480px; */
  border: 2px solid #d7be8a;
  background: black;
  display: flex;
  flex-direction: column;
  ${(props) => props.padding && "padding: 60px;"}

  @media (max-width: 800px) {
    ${(props) => props.padding && "padding: 40px;"}
    ${(props) => props.padding && "padding-bottom: 60px;"}
    width: 100%;
  }
  @media (max-width: 420px) {
    ${(props) => props.padding && "padding: 20px;"}
  }
`;

const TitleSub = styled.div`
  font-weight: 600;
  font-size: 26px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;
  margin-top: 24px;
  width: 100%;
`;
const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-top: 20px;

  width: 100%;
  min-height: 180px;
  height: max-content;
  height: 100%;
  color: #ffffff;
  @media (max-width: 420px) {
    margin-top: 0;
  }
`;

const ArrowHolder = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  @media (max-width: 420px) {
    margin-top: 16px;
  }
`;

const ImageFramer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 526px;

  overflow: hidden;
  .gatsby-image-wrapper {
    width: 100%;
  }

  img {
    object-fit: cover !important;
    height: 650px !important;
    @media (max-width: 1100px) {
      height: 650px !important;
    }
    @media (max-width: 900px) {
      height: 750px !important;
    }
    @media (max-width: 800px) {
      height: 90vw !important;
      min-height: 520px !important;
    }
  }
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  svg {
    min-width: 24px;
    min-height: 24px;
    max-width: 24px;
    max-height: 24px;
    color: #d7be8a;
  }
`;
function Reviews() {
  const [picked, setPicked] = useState(0);

  let reviews = [
    {
      review:
        "Bună! Sincer, am fost întotdeauna un pic sceptică în legătură cu horoscoapele, dar un prieten mi-a recomandat acest site, și m-am gândit să încerc. Ei bine, am fost uimită cât de precis a descris experiențele și emoțiile mele recente. Mi-am dat seama că horoscopul poate fi un instrument util pentru a înțelege mai bine ce simt și poate chiar să îmi ofere un ghid atunci când sunt confuză. Acum îl verific regulat, și chiar m-a ajutat să iau niște decizii importante. Dacă ești în dubiu, îți recomand să încerci. Poate vei găsi și tu răspunsurile pe care le cauți!",
      name: "Andreea Ionescu",
    },

    {
      review:
        "De multe ori, am trecut pe lângă horoscoape fără să le dau prea multă atenție. Dar recent, într-o dimineață în care aveam nevoie de o schimbare în rutina mea, am dat peste acest site. A fost ca și cum aș fi citit un gând ascuns din mintea mea - atât de precis și revelator. Horoscopul nu numai că m-a făcut să mă gândesc la direcția în care se îndreaptă viața mea, dar m-a și inspirat să iau măsuri concrete în anumite aspecte. Nu mă așteptam să găsesc un astfel de ghid în astre, dar mă bucur că am făcut-o. Pentru cei sceptici, vă sfătuiesc să încercați măcar o dată. S-ar putea să descoperiți ceva valoros!",
      name: "Alexandru Mihăilescu",
    },
    {
      review:
        "Dragii mei, eu nu prea m-am încrezut vreodată în astre și în toate povestirile astea cu horoscopul. Dar nepoata mea mi-a arătat zilele trecute acest horoscop și, sincer, m-a surprins! Descria exact cum mă simțeam și ce mi s-a întâmplat în săptămâna aceea. Am zis că poate e doar o coincidență, dar m-am uitat și zilele următoare și iarăși a avut dreptate! Acum îmi încep dimineața cu o cafea și citesc horoscopul, să văd ce mă așteaptă în ziua care vine. Chiar dacă nu vă încredeți, dați-i o șansă, poate veți fi la fel de surprinși ca mine! Mulțumesc, dragii mei, și să aveți parte numai de zile bune și fericite!",
      name: "Maria Popescu",
    },
  ];

  return (
    <section>
      <TittleH3>FEEDBACK-uri</TittleH3>
      <ReviewHolder>
        <Box>
          <ImageFramer>
            {picked == 0 && (
              <StaticImage src="../../images/review2.webp" alt="angel" />
            )}
            {picked == 1 && (
              <StaticImage src="../../images/review3.png" alt="angel" />
            )}
            {picked == 2 && (
              <StaticImage src="../../images/review1.png" alt="angel" />
            )}
          </ImageFramer>
        </Box>

        <Box padding={true}>
          <Paragraph>{reviews[picked].review}</Paragraph>
          <TitleSub> {reviews[picked].name}</TitleSub>

          <Row>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </Row>

          <ArrowHolder>
            <ArrowButton
              side="left"
              onClick={() => setPicked((p) => (p - 1 < 0 ? 2 : p - 1))}
            />
            <ArrowButton
              side="right"
              onClick={() => setPicked((p) => (p + 1 > 2 ? 0 : p + 1))}
            />
          </ArrowHolder>
        </Box>
      </ReviewHolder>
    </section>
  );
}

export default Reviews;

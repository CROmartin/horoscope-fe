import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Button from "../shared/Button";

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  gap: 64px;
  justify-content: center;

  margin-top: 96px;
  @media (max-width: 860px) {
    flex-direction: column;
    .costumer {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;

    margin-top: 32px;
  }
  .costumer {
    max-height: 500px;
    border: 1px solid #d7be8a;
    @media (max-width: 485px) {
      max-height: 400px;
    }
    @media (max-width: 400px) {
      max-height: 300px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      /* object-size */
      object-position: left 20%;

      @media (max-width: 485px) {
        object-position: center;
      }
    }
  }
`;

const Paragraph = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
  line-height: 22px;

  @media (max-width: 760px) {
    font-size: 14px;
    text-align: left;
  }
  b {
    font-weight: 800;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: 860px) {
    width: 100%;
  }
`;

function AboutUs() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideoOnInteraction = () => {
      // Attempt to play the video
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => {
            console.log("Video playback started successfully.");
            document.removeEventListener("click", playVideoOnInteraction);
            document.removeEventListener("touchstart", playVideoOnInteraction);
            document.removeEventListener("keydown", playVideoOnInteraction);
            document.removeEventListener("mousedown", playVideoOnInteraction);

            document.removeEventListener("mousemove", playVideoOnInteraction);
          })
          .catch((e) => {
            console.error("Error attempting to play video:", e);
            // Handle playback failure here
          });
      }
    };

    // Add event listeners to the document for various user interactions
    document.addEventListener("click", playVideoOnInteraction);
    document.addEventListener("touchstart", playVideoOnInteraction);
    document.addEventListener("keydown", playVideoOnInteraction);
    document.addEventListener("mousedown", playVideoOnInteraction);

    document.addEventListener("mousemove", playVideoOnInteraction);

    return () => {
      // Cleanup the event listeners on component unmount
      document.removeEventListener("click", playVideoOnInteraction);
      document.removeEventListener("touchstart", playVideoOnInteraction);
      document.removeEventListener("keydown", playVideoOnInteraction);
      document.removeEventListener("mousedown", playVideoOnInteraction);

      document.removeEventListener("mousemove", playVideoOnInteraction);
    };
  }, []);

  return (
    <Holder>
      <Column>
        <Title>Despre noi</Title>
        <Paragraph>
          Plonjează în universul astrologiei personalizate cu Horoscopul nostru
          AI! Serviciul nostru combină algoritmi AI avansați cu astrologia
          pentru a-ți oferi predicții profund personalizate și precise.
          Acoperind toate aspectele vieții tale, de la carieră la relații, îți
          oferim perspective detaliate și de calitate.
          <ul>
            <li>
              <b>Personalizat pentru Tine</b>: Primește predicții care rezonă cu
              ritmul unic al vieții tale.
            </li>
            <li>
              <b>Perspective de Calitate</b>: Bucură-te de lecturi cuprinzătoare
              și insightful.
            </li>
            <li>
              <b>Mereu Actualizat</b> : Rămâi în ton cu cele mai recente
              perspective cosmice.
            </li>
            <li>
              <b>Ușor de Utilizat</b>: Experimentează astrologia cu ușurință și
              plăcere.
            </li>
          </ul>
          Începe astăzi călătoria ta de descoperire cosmică și
          autoconștientizare cu Horoscopul nostru AI!
          <br />
          <br />
          <br />
          <Button
            message="Citește horoscopul
"
            link="/horoscop"
          />
        </Paragraph>
      </Column>
      <video
        controls
        className="costumer"
        autoPlay
        style={{
          maxWidth: "100%",
          maxHeight: "500px",
          border: "1px solid #d7be8a",
        }}
        ref={videoRef}
        // preload="metadata" // This helps in loading the video metadata in advance
      >
        <source src="/videos/romanian.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Holder>
  );
}

export default AboutUs;

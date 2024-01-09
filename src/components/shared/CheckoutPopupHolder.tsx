import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import Loader from "./Loader";
import useSubscriptionStore from "../../Zustand/SubscriptionStore";
import Button from "./Button";
import { ReactComponent as Exit } from "./Icons/exit.svg";
import { ReactComponent as Star } from "./Icons/star.svg";
import { navigate } from "gatsby";

const PopupBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  padding-bottom: 48px;
  background-color: black;
  border: 1px solid #d7be8a;
  width: 45%;
  min-height: 400px;
  color: #d7be8a;
  max-width: 680px;

  #exit {
    position: absolute;
    right: 16px;
    top: 16px;
    max-width: 32px;
    max-height: 32px;
    cursor: pointer;
  }

  #payment-form {
    width: 100%;
    div {
      width: 100%;
    }
  }
  @media (max-width: 1000px) {
    width: 60%;
  }

  @media (max-width: 800px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const InfoHolder = styled.div`
  div,
  h3,
  h4 {
    width: 100%;
  }
  h3 {
    color: white;
  }

  h4 {
    margin-bottom: 32px;
  }
  h3,
  h4 {
    text-align: center;
    b {
      font-weight: 600;
      color: white;
    }
  }
  div {
    margin-bottom: 16px;
    b {
      font-weight: 600;
      color: white;
    }
  }
  width: 100%;
  margin-bottom: 32px;
`;

const Column = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 22px;
  color: white;
`;
const Row = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThankYou = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 28px;
    color: white;
    text-align: center;
    margin-top: 0;
    margin-bottom: 48px;
    width: 60%;
    @media (max-width: 580px) {
      width: 100%;
    }
  }
`;

const StarRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  svg {
    min-width: max-content;
  }
  margin-bottom: 24px;
  gap: 8px;
  max-height: 0;
  translate: 0 0px;
  @media (max-width: 580px) {
    margin-bottom: 32px;
    max-height: 122px;
  }
`;

const Key = process.env.Key || "";
const stripePromise = loadStripe(Key);

function CheckoutPopupHolder({ children, setIsPopupOpen }: any) {
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(0);

  const { purchased } = useSubscriptionStore();

  useEffect(() => {
    let getPrice = parseInt(localStorage.getItem("priceHoroscope") || "1000");
    setPrice(getPrice / 100);
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: getPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "night",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <PopupBackground>
        <Box>
          {clientSecret && purchased && (
            <>
              <Exit onClick={() => setIsPopupOpen(false)} id="exit" />
              <ThankYou>
                <StarRow>
                  <Star />

                  <Star />
                </StarRow>
                <h3>Vă mulțumim pentru achiziție!</h3>

                <Button
                  message="Explorați Horoscop"
                  onClick={() => {
                    if (window?.location?.pathname.includes("about-us")) {
                      navigate("/");
                    } else {
                      setIsPopupOpen(false);
                    }
                  }}
                />
              </ThankYou>
            </>
          )}
          {clientSecret && !purchased && (
            <>
              <InfoHolder>
                <h3> 🌟 Explorează-ți stelele! 🌠 </h3>
                <h4>
                  Obțineți <b>hacces exclusiv</b> la horoscoape pentru trei luni
                </h4>
                <div>
                  ✨ <b>Descoperă zilnic înțelepciuni</b> pentru dragoste,
                  carieră și dezvoltare personală.
                </div>
                <div>
                  🔮 <b>Încredere din partea miilor</b> pentru îndrumare precisă
                  și inspiratoare.
                </div>
                <div>
                  ⏰ <b>Ofertă limitată:</b> Îmbrățișează-ți călătoria
                  astrologică astăzi!
                </div>
              </InfoHolder>
              <Column>
                <b> {Math.ceil((1 - price / (price + 5)) * 100)}% OFF</b>
                <Row>
                  <s>{price + 5} RON</s>
                  <b>{price} RON</b>
                </Row>
              </Column>
              <Elements options={options} stripe={stripePromise}>
                {children}
              </Elements>
            </>
          )}
          {!clientSecret && <Loader />}
        </Box>
      </PopupBackground>
    </>
  );
}

export default CheckoutPopupHolder;

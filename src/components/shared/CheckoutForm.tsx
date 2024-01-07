import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loader from "./Loader";
import styled from "styled-components";
import useSubscriptionStore from "../../Zustand/SubscriptionStore";

const PayButton = styled.button`
  background-color: black;
  border: 1px solid #d7be8a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  cursor: pointer;
  padding: 16px 32px;
  font-size: 24px;
  margin: auto;
  margin-top: 32px;
`;

const StripeForm = styled.form`
  label {
    color: white;
  }
  width: 100%;
`;

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const { setPurchased, setSubscription } = useSubscriptionStore();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        console.log("PaymentIntent:", paymentIntent);
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // return_url: "http://localhost:8000",
      },
    });

    console.log("PaymentIntentPayment:", paymentIntent, paymentIntent?.status);

    switch (paymentIntent?.status) {
      case "succeeded":
        setMessage("Payment succeeded!");
        // Get the current date
        const currentDate = new Date();

        // Set the subscription date to 3 months later
        const subscriptionDate = new Date(
          currentDate.setMonth(currentDate.getMonth() + 3)
        );

        // Format the date as needed and set it
        // For example, in ISO format:
        const subscriptionISODate = subscriptionDate.toISOString();

        // Assuming setSubscription is your function to update the subscription date
        console.log("subscriptionISODate", subscriptionISODate);
        setSubscription(subscriptionISODate);
        setPurchased(true);
        break;
      case "processing":
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        setMessage("Your payment was not successful, please try again.");
        break;
      default:
        setMessage("Something went wrong.");
        break;
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <StripeForm id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <PayButton disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <Loader size={"small"} /> : "Pay now"}
        </span>
      </PayButton>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </StripeForm>
  );
}

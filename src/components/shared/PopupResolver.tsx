import React, { useEffect } from "react";
import CheckoutPopupHolder from "./CheckoutPopupHolder";
import CheckoutForm from "./CheckoutForm";
import useSubscriptionStore from "../../Zustand/SubscriptionStore";

function PopupResolver() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const { subscription, setActivity, activity } = useSubscriptionStore();

  useEffect(() => {
    console.log("subscription", subscription);
    console.log("activity", activity);
    const activityVar: any = parseInt(localStorage.getItem("activity") || "0");
    setActivity(activityVar);
    if (subscription && activityVar >= 5) {
      const subscriptionDate = new Date(subscription);
      const currentDate = new Date();

      // Check if the current date is after the subscription date
      if (currentDate > subscriptionDate) {
        // If the current date is past the subscription date, the subscription is not active
        setIsPopupOpen(true);
      }
    } else if (!subscription && activityVar >= 5) {
      // If there is no subscription date set, consider the subscription as inactive
      setIsPopupOpen(true);
    }
  }, [activity]);

  return (
    <>
      {isPopupOpen && (
        <CheckoutPopupHolder setIsPopupOpen={setIsPopupOpen}>
          <CheckoutForm />{" "}
        </CheckoutPopupHolder>
      )}
    </>
  );
}

export default PopupResolver;

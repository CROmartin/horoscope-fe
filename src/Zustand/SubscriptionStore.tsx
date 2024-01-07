import { create } from "zustand";

type SubscriptionStore = {
  subscription: string | any;
  purchased: boolean;
  setSubscription: (sub: string) => void;
  setPurchased: (purchased: boolean) => void;
  activity: number;
  setActivity: (activity: number) => void;
};

const useSubscriptionStore = create<SubscriptionStore>((set) => {
  let subscription = "";
  if (typeof window !== "undefined") {
    subscription = localStorage?.getItem("subscriptionHoroscop") || "";
  }
  return {
    subscription: subscription,
    setSubscription: (sub: string) => {
      set(() => {
        localStorage?.setItem("subscriptionHoroscop", sub);
        return { subscription: sub };
      });
    },
    purchased: false,
    setPurchased: (purchased: boolean) => {
      set(() => {
        return { purchased };
      });
    },
    activity: 0,
    setActivity: (activity: number) => {
      set(() => {
        return { activity };
      });
    },
  };
});

export default useSubscriptionStore;

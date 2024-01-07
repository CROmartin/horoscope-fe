import React from "react";
import Layout from "./src/components/shared/Layout";
import { WrapPageElementBrowserArgs, RouteUpdateArgs } from "gatsby";

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs) => {
  return <Layout>{element}</Layout>;
};

export const onRouteUpdate = ({ location, prevLocation }: RouteUpdateArgs) => {
  // Check if the location actually changed (not on initial load)
  if (prevLocation) {
    let activity: any = localStorage.getItem("activity") || 0;
    if (location.pathname !== prevLocation.pathname) {
      activity = parseInt(activity) + 1;
      if (activity === 5) {
        window.location.reload();
      }

      localStorage.setItem("activity", activity);
    }

    console.log("new pathname", location.pathname, activity);
  }
};

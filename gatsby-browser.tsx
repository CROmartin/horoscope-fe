import React from "react";
import Layout from "./src/components/shared/Layout";
import { WrapPageElementBrowserArgs } from "gatsby";

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs) => {
  return <Layout>{element}</Layout>;
};

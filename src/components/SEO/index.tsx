import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
}
export const SEO: React.FC<SEOProps> = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title === "" ? "Walley" : `Walley | ${props.title}`}</title>
    </Helmet>
  );
};

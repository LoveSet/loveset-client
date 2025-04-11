import React from "react";
import { Helmet } from "react-helmet";
// import LogoBanner from "../../../assets/img/loveset_banner.png";

function CustomHead({
  title = null,
  description = null,
  keywords = "",
  image = null,
}) {
  let defaultDesc =
    "Find your next favorite movie or show with LoveSet. Swipe right on titles you love, get personalized recommendations that match your unique taste.";

  return (
    <Helmet>
      <title>{title ? `${title} - LoveSet` : "LoveSet"}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={`${keywords}`} />

      <meta
        property="og:title"
        content={title ? `${title} - LoveSet` : "LoveSet"}
      />
      <meta property="og:description" content={description || defaultDesc} />
      {/* <meta property="og:image" content={image || LogoBanner} /> */}
    </Helmet>
  );
}

export default CustomHead;

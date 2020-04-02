import Head from "next/head";
import React from "react";

const defaultDescription =
  "Fanbefaling giver dig en lille, men nøje udvalgt samling podcasts.";
const defaultOGURL = "http://www.fanbefaling.dk";
const defaultOGImage =
  "http://www.fanbefaling.dk/static/fanbefaling_banner.png";

export default ({ podcast }) => {
  const { titel, beskrivelse, billede, url } = podcast?.fields || {};
  const { file } = billede?.fields || {};
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{titel || "Fanbefaling"}</title>
        <meta name="description" content={beskrivelse || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:url" content={url || defaultOGURL} />
        <meta property="og:title" content={titel || ""} />
        <meta
          property="og:description"
          content={beskrivelse || defaultDescription}
        />
        <meta name="twitter:site" content={url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={file?.url || defaultOGImage} />
        <meta property="og:image" content={file?.url || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
    </div>
  );
};

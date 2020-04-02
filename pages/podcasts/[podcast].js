import React, { useEffect } from "react";
import client from "../../services/contentful";

export default ({ podcast, setActivePodcast }) => {
  useEffect(() => {
    setActivePodcast(podcast);
  }, []);
  return <div></div>;
};

export const getStaticProps = async context => {
  const { items } = await client.getEntries({
    content_type: "podcast",
    "fields.url": context.params.podcast
  });
  return {
    props: {
      podcast: items[0]
    }
  };
};

export const getStaticPaths = async () => {
  const { items } = await client.getEntries({
    content_type: "podcast"
  });
  return {
    paths: items.map(item => `/podcasts/${item.fields.url}`),
    fallback: true
  };
};

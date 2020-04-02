import React, { useState, useEffect } from "react";
import "../styles.css";
import {
  Pane,
  Heading,
  Text,
  SegmentedControl,
  SideSheet,
  CornerDialog
} from "evergreen-ui";
import client from "../services/contentful";
import ItemCard from "../components/ItemCard";
import { PodcastDetails } from "../components/PodcastDetails";
import Head from "../components/Head";
import ReactGA from "react-ga";

export default ({ Component, pageProps }) => {
  const [activePodcast, setActivePodcast] = useState();
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [cookieBanner, showCookieBanner] = useState(false);
  const [cookiesAccepted, updateCookiesAccepted] = useState(false);
  const [genrer, setGenrer] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const genreOptions = genrer
    ? [
        { label: "Alle", value: "all" },
        ...genrer.map(({ fields: { titel, url } }) => {
          return { label: titel, value: url };
        })
      ]
    : [{ label: "Alle", value: "all" }];
  const filteredPodcasts =
    selectedGenre === "all"
      ? podcasts
      : podcasts?.filter(
          podcast => podcast.fields.kategori.fields.url === selectedGenre
        );
  cookiesAccepted && ReactGA.initialize("UA-119391292-1");
  cookiesAccepted && ReactGA.pageview(window.location.pathname);
  useEffect(() => {
    const getData = async () => {
      const genreCall = await client.getEntries({
        content_type: "kategori",
        order: "fields.titel"
      });
      setGenrer(genreCall.items);
      const podcastCall = await client.getEntries({
        content_type: "podcast"
      });
      setPodcasts(podcastCall.items);
    };
    getData();
    const cookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)showCookieBannerFanbefaling\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    !cookie ? showCookieBanner(true) : updateCookiesAccepted(true);
  }, []);
  return (
    <div>
      <Head podcast={activePodcast}></Head>
      <Pane margin="20px">
        <Heading fontSize="30px" marginTop="40px">
          <span style={{ fontSize: "60px", color: "green" }}>F</span> A N B E F
          A L I N G
        </Heading>
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          marginTop={-20}
        >
          <Text marginTop={20} size={600}>
            En lille samling af fede podcasts
          </Text>
          <SegmentedControl
            height={40}
            width={1000}
            marginTop={20}
            options={genreOptions}
            value={selectedGenre}
            onChange={value => setSelectedGenre(value)}
          ></SegmentedControl>
        </Pane>
      </Pane>
      <Pane>
        <SideSheet
          position="left"
          width="440px"
          isShown={activePodcast}
          onCloseComplete={() => {
            setActivePodcast();
            window.history.pushState({ page: "/" }, "Fanbefaling", "/");
          }}
        >
          <PodcastDetails activePodcast={activePodcast} />
        </SideSheet>
        <Pane display="flex" flexWrap="wrap">
          {filteredPodcasts.map(item => (
            <div
              style={{ height: "200px", margin: "20px" }}
              key={item.fields.url}
            >
              <ItemCard
                key={item.sys.id}
                item={item}
                setActivePodcast={setActivePodcast}
                activePodcast={activePodcast}
              ></ItemCard>
            </div>
          ))}
        </Pane>
      </Pane>
      <Component
        {...pageProps}
        activePodcast={activePodcast}
        setActivePodcast={setActivePodcast}
      />
      <CornerDialog
        title="Vi bruger cookies"
        isShown={cookieBanner}
        onConfirm={() => {
          document.cookie =
            "showCookieBannerFanbefaling=false;max-age=31536000";
          showCookieBanner(false);
          updateCookiesAccepted(true);
        }}
        confirmLabel="OK, mål mig bare"
        cancelLabel="Jeg vil gerne være anonym"
        onCancel={() => {
          showCookieBanner(false);
        }}
      >
        Vi bruger cookies til at måle dit besøg i Google Analytics.
      </CornerDialog>
    </div>
  );
};

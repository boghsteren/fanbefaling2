import React from "react";
import { Pane, Heading, Text, Card } from "evergreen-ui";
import ReactMarkdown from "react-markdown";

export const PodcastDetails = ({
  activePodcast: {
    fields: {
      billede: {
        fields: {
          file: { url }
        }
      },
      titel,
      beskrivelse,
      blurb,
      startsted
    }
  }
}) => {
  return (
    <Pane>
      <Pane border="default" padding="20px" height="440px" width="440px">
        <Card>
          <img style={{ height: "400px", width: "400px" }} src={url}></img>
        </Card>
      </Pane>
      <Pane border="default" padding={20}>
        <Heading size={900}>{titel}</Heading>
        <Text>{blurb}</Text>
      </Pane>
      <Pane padding="20px">
        <Text>
          <ReactMarkdown>{beskrivelse}</ReactMarkdown>
        </Text>
      </Pane>
      <Pane padding="20px" paddingTop="0px">
        <Heading>Hvor skal man starte?</Heading>
        <Text>
          <ReactMarkdown>{startsted}</ReactMarkdown>
        </Text>
      </Pane>
    </Pane>
  );
};

import React, { useState } from "react";
import { Card, Pane, Heading } from "evergreen-ui";
import { motion, AnimatePresence } from "framer-motion";

export default ({ item, setActivePodcast, activePodcast }) => {
  const [flipped, set] = useState(false);
  const isActive = activePodcast?.sys.id === item.sys.id;
  return (
    <motion.div
      style={{ width: "200px", height: "200px", cursor: "pointer" }}
      onMouseOver={() => set(true)}
      onMouseOut={() => set(false)}
      onClick={() => {
        setActivePodcast(item);
        window.history.pushState(
          `/podcasts/${item.fields.url}`,
          item.fields.titel,
          `/podcasts/${item.fields.url}`
        );
      }}
    >
      <AnimatePresence>
        {flipped || isActive ? (
          <motion.div
            key={item.sys.id}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute" }}
          >
            <Pane
              width="200px"
              height="200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Heading size={600} textAlign="center">
                {item.fields.titel}
              </Heading>
            </Pane>
          </motion.div>
        ) : (
          <motion.div
            key={`${item.sys.id}+2`}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute" }}
            positionTransition
          >
            <Card
              border
              width="200px"
              height="200px"
              elevation={3}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url('${item.fields.billede.fields.file.url}')`
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

import React from "react";
import MemeFeed from "./components/MemeFeed";
import MemeCreator from "./components/MemeCreator";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Meme Social
      </Typography>
      <MemeCreator />
      <MemeFeed />
    </Container>
  );
}

export default App;
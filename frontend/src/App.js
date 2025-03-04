import React from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ScorecardForm from "./ScorecardForm";
import Dashboard from "./Dashboard";
import Typography from "@mui/material/Typography";

const theme = createTheme();

function App() {
  const handleFormSubmit = (payload) => {
    fetch("http://3.106.241.199:8000/api/entries/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(() => window.location.reload()) // Simple way to refresh data
      .catch((error) => console.error("Error:", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{ margin: "20px 0" }}
        >
          Dynamic Scorecard Tool
        </Typography>
        <ScorecardForm
          onSubmit={handleFormSubmit}
          initialWeights={{ prod: 0.4, qual: 0.35, time: 0.25 }}
        />
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;

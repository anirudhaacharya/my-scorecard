import React from 'react';
import { Slider, Typography, Grid, Box } from '@mui/material';

const WeightSettings = ({ weights, onWeightChange }) => {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  
  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Scoring Weights (Total: {Math.round(total * 100)}%)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Productivity ({Math.round(weights.prod * 100)}%)</Typography>
          <Slider
            value={weights.prod}
            min={0}
            max={1}
            step={0.01}
            onChange={(e, value) => onWeightChange('prod', value)}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Quality ({Math.round(weights.qual * 100)}%)</Typography>
          <Slider
            value={weights.qual}
            min={0}
            max={1}
            step={0.01}
            onChange={(e, value) => onWeightChange('qual', value)}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Timeliness ({Math.round(weights.time * 100)}%)</Typography>
          <Slider
            value={weights.time}
            min={0}
            max={1}
            step={0.01}
            onChange={(e, value) => onWeightChange('time', value)}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeightSettings;
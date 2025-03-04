import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import WeightSettings from './WeightSettings';


function ScorecardForm({ onSubmit, initialWeights }) {
  const [data, setData] = useState({
    score_name: '',
    productivity: '',
    quality: '',
    timeliness: '',
    prod_weight: initialWeights?.prod || 0.4,
    qual_weight: initialWeights?.qual || 0.35,
    time_weight: initialWeights?.time || 0.25
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleWeightChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [`${field}_weight`]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...data,
      productivity: parseFloat(data.productivity),
      quality: parseFloat(data.quality),
      timeliness: parseFloat(data.timeliness),
      prod_weight: parseFloat(data.prod_weight),
      qual_weight: parseFloat(data.qual_weight),
      time_weight: parseFloat(data.time_weight)
    };
    
    onSubmit(payload);
    setData({ 
      score_name: '', 
      productivity: '', 
      quality: '', 
      timeliness: '',
      prod_weight: initialWeights.prod,
      qual_weight: initialWeights.qual,
      time_weight: initialWeights.time
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        New Score Entry
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Score Name"
              name="score_name"
              value={data.score_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <WeightSettings
              weights={{
                prod: data.prod_weight,
                qual: data.qual_weight,
                time: data.time_weight
              }}
              onWeightChange={handleWeightChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Productivity Score"
              type="number"
              inputProps={{ step: "0.1", min: "0", max: "100" }}
              name="productivity"
              value={data.productivity}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Quality Score"
              type="number"
              inputProps={{ step: "0.1", min: "0", max: "100" }}
              name="quality"
              value={data.quality}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Timeliness Score"
              type="number"
              inputProps={{ step: "0.1", min: "0", max: "100" }}
              name="timeliness"
              value={data.timeliness}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Calculate & Save Score
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );


}

ScorecardForm.defaultProps = {
  initialWeights: {
    prod: 0.4,
    qual: 0.35,
    time: 0.25
  }
};

export default ScorecardForm;
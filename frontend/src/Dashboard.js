import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography, Grid, IconButton, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { saveAs } from 'file-saver';
import { compressToEncodedURIComponent } from 'lz-string';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    fetch('http://127.0.0.1:8000/api/entries/')
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  // CSV Export Function
  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'Productivity', 'Quality', 'Timeliness', 'Weights (P/Q/T)', 'Total Score', 'Date'],
      ...entries.map(entry => [
        `"${entry.score_name}"`,
        entry.productivity,
        entry.quality,
        entry.timeliness,
        `${entry.prod_weight}/${entry.qual_weight}/${entry.time_weight}`,
        entry.total_score.toFixed(2),
        new Date(entry.created_at).toLocaleDateString()
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'performance_scores.csv');
  };

  // Shareable Link Function
  const generateShareLink = () => {
    try {
      const compressedData = compressToEncodedURIComponent(JSON.stringify(entries));
      const baseUrl = window.location.href.split('?')[0];
      const shareUrl = `${baseUrl}?shared=${compressedData}`;
      
      navigator.clipboard.writeText(shareUrl);
      alert('Shareable link copied to clipboard!');
    } catch (error) {
      console.error('Error generating link:', error);
      alert('Error generating share link');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await fetch(`http://127.0.0.1:8000/api/entries/${id}/`, {
          method: 'DELETE'
        });
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const chartData = {
    labels: entries.map(entry => entry.score_name),
    datasets: [
      {
        label: 'Total Score',
        data: entries.map(entry => entry.total_score),
        backgroundColor: theme.palette.primary.main + '80',
        borderColor: theme.palette.primary.main,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Performance Scores Overview' },
      tooltip: {
        callbacks: {
          footer: (tooltipItems) => {
            const entry = entries[tooltipItems[0].dataIndex];
            return `Weights: P-${entry.prod_weight * 100}% Q-${entry.qual_weight * 100}% T-${entry.time_weight * 100}%`;
          }
        }
      }
    },
    scales: {
      y: { max: 100 }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Performance Analysis Dashboard
        </Typography>
        
        <div>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<InsertDriveFileIcon />}
            onClick={handleExportCSV}
            disabled={!entries.length}
            sx={{ mr: 1 }}
          >
            CSV
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LinkIcon />}
            onClick={generateShareLink}
            disabled={!entries.length}
          >
            Share
          </Button>
        </div>
      </div>

      {entries.length ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', p: 3 }}>
          No scores recorded yet. Add your first score to begin analysis.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {entries.map(entry => (
          <Grid item xs={12} sm={6} md={4} key={entry.id}>
            <Paper elevation={2} sx={{ p: 2, position: 'relative' }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(entry.id)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'error.main'
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <Typography variant="subtitle1" sx={{ 
                fontWeight: 'bold',
                mb: 1,
                pr: 4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {entry.score_name}
              </Typography>

              <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                {entry.total_score.toFixed(1)}
                <Typography variant="caption" display="block" color="text.secondary">
                  Weighted Total
                </Typography>
              </Typography>

              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    Productivity
                    <br />
                    <strong>{entry.productivity}</strong>
                    <Typography variant="caption" display="block" color="text.secondary">
                      ({entry.prod_weight * 100}%)
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    Quality
                    <br />
                    <strong>{entry.quality}</strong>
                    <Typography variant="caption" display="block" color="text.secondary">
                      ({entry.qual_weight * 100}%)
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">
                    Timeliness
                    <br />
                    <strong>{entry.timeliness}</strong>
                    <Typography variant="caption" display="block" color="text.secondary">
                      ({entry.time_weight * 100}%)
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="caption" color="text.secondary" sx={{ 
                display: 'block',
                textAlign: 'right',
                mt: 1
              }}>
                Created: {new Date(entry.created_at).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default Dashboard;
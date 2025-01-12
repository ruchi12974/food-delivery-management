import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, CircularProgress, Grid } from '@mui/material';
import { fetchDeliveryTasks } from '../services/api';
import DeliveryDashboard from '../components/DeliveryDashboard';

const DeliveryPersonnelDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchDeliveryTasks();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch delivery tasks:', error);
      }
    };
    getTasks();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Delivery Personnel Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Delivery Tasks</Typography>
            <DeliveryDashboard tasks={tasks} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeliveryPersonnelDashboard;

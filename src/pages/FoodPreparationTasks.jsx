import React, { useEffect, useState } from 'react';
import { Paper, List, ListItem, ListItemText, Button, CircularProgress, Typography, Container, Grid } from '@mui/material';
import { foodPreparaionTaskStatus } from '../services/api';
import { foodPreprationTask } from '../services/api';

const FoodPreparationTasks = () => {
  const [foodPreparation, setPreparation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPreparationDetails = async () => {
      try {
        const data = await foodPreprationTask();
        console.log(data); // Debugging API response
        setPreparation(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch deliveryDetails:', error);
      }
    };
    getPreparationDetails();
  }, []);

  

  const handlePreparationStatus= async (id) => {
    try {
      await foodPreparaionTaskStatus(id);
      setPreparation((prev) =>
        prev.map((d) => (d._id === id ? { ...d, tatus: 'Success' } : d))
      );
    } catch (error) {
      console.error('Failed to mark as delivered:', error);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ padding: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Loading Preparation Details...</Typography>
      </Paper>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Food Preparation Tasks
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Preparation Tasks</Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
      <List>
        {foodPreparation.map((food) => (
          <ListItem key={food._id} sx={{ borderBottom: '1px solid #ddd', padding: 2 }}>
            <ListItemText
              primary={`Task: ${food.taskName}`}
              secondary={`Meal Type: ${food.mealType}`}
            />
            <ListItemText
              primary={`Assigned To: ${food.assignedTo.name} (${food.assignedTo.role})`}
              secondary={`Delivery Status: ${food.status}`}
            />
            <ListItemText
              primary={`Patient: ID ${food.patientId._id}, Age: ${food.patientId.age}`}
              secondary={`Room Number: ${food.ingredients}`}
            />
            <ListItemText primary={`Notes: ${food.instructions}`} />
            {food.status === 'Pending' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePreparationStatus(food._id)}
              >
                {food.status === 'Pending' ? "Mark as Success" : "Success"}
              </Button>
            )}
          
              {food.status === 'Success' && (
                <Button variant="contained"
                          color="primary"
                        >
                        Success
              </Button>)}</ListItem>
        ))}
      </List>
    </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    
  );
};

export default FoodPreparationTasks;




import React, { useEffect, useState } from 'react';
import { Paper, List, ListItem, ListItemText, Button, CircularProgress, Typography } from '@mui/material';
import { markMealDelivered } from '../services/api';
import { fetchDeliveryTasks } from '../services/api';

const DeliveryDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDeliveryDetails = async () => {
      try {
        const data = await fetchDeliveryTasks();
        console.log(data); // Debugging API response
        setDeliveries(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch deliveryDetails:', error);
      }
    };
    getDeliveryDetails();
  }, []);

  const handleMarkDelivered = async (id) => {
    try {
      await markMealDelivered(id);
      alert('Meal marked as delivered!');
      setDeliveries((prev) =>
        prev.map((d) => (d._id === id ? { ...d, deliveryStatus: 'Delivered' } : d))
      );
    } catch (error) {
      console.error('Failed to mark as delivered:', error);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ padding: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Loading Delivery Details...</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Delivery Dashboard
      </Typography>
      <List>
        {deliveries.map((delivery) => (
          <ListItem key={delivery._id} sx={{ borderBottom: '1px solid #ddd', padding: 2 }}>
            <ListItemText
              primary={`Task: ${delivery.taskId.taskName}`}
              secondary={`Meal Type: ${delivery.taskId.mealType}`}
            />
            <ListItemText
              primary={`Assigned To: ${delivery.assignedTo.name} (${delivery.assignedTo.role})`}
              secondary={`Delivery Status: ${delivery.deliveryStatus}`}
            />
            <ListItemText
              primary={`Patient: ID ${delivery.patientId._id}, Age: ${delivery.patientId.age}`}
              secondary={`Room Number: ${delivery.patientId.roomNumber}`}
            />
            <ListItemText
              primary={`Meal Box ID: ${delivery.mealBoxId}`}
              secondary={`Delivery Time: ${new Date(delivery.deliveryTime).toLocaleString()}`}
            />
            <ListItemText primary={`Notes: ${delivery.notes}`} />
            {delivery.deliveryStatus === 'Pending' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleMarkDelivered(delivery._id)}
              >
                {delivery.deliveryStatus === 'Pending' ? "Mark as Delivered" : "Delivered"}
              </Button>
            )}
          
              {delivery.deliveryStatus === 'Delivered' && (
                <Button variant="contained"
                          color="primary"
                        >
                        Delivered
              </Button>)}</ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DeliveryDashboard;




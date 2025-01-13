import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const ManageDeliveryPersonnel = () => {
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    contact: '',
    mealBoxAssigned: '',
    otherDetails: ''
  });
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [updatedPerson, setUpdatedPerson] = useState({
    name: '',
    contact: '',
    mealBoxAssigned: '',
    otherDetails: ''
  });

  // Fetch delivery personnel details
  useEffect(() => {
     axios.get('https://hospital-food-management-backend.onrender.com/api/deliveries')
      .then((response) => {
        setDeliveryPersonnel(response.data); // Assuming the response contains a list of delivery personnel
      })
      .catch((error) => {
        console.error('Error fetching delivery personnel:', error);
      });
  }, []);

  // Handle input changes for adding a new delivery personnel
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({
      ...newPerson,
      [name]: value
    });
  };

  // Handle input changes for updating delivery personnel
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPerson({
      ...updatedPerson,
      [name]: value
    });
  };

  // Handle adding a new delivery personnel
  const handleAddPersonnel = () => {
    axios
      .post('https://hospital-food-management-backend.onrender.com/api/deliveries', newPerson)
      .then((response) => {
        setDeliveryPersonnel([...deliveryPersonnel, response.data]);
        setNewPerson({ name: '', contact: '', mealBoxAssigned: '', otherDetails: '' }); // Reset fields
      })
      .catch((error) => {
        console.error('Error adding delivery personnel:', error);
      });
  };

  // Handle updating delivery personnel details
  const handleUpdatePersonnel = () => {
    if (selectedPersonId && updatedPerson.name) {
      axios
        .put(`https://hospital-food-management-backend.onrender.com/api/deliveries/${selectedPersonId}`, updatedPerson)
        .then((response) => {
          setDeliveryPersonnel(
            deliveryPersonnel.map((person) =>
              person._id === selectedPersonId ? { ...person, ...updatedPerson } : person
            )
          );
          setUpdatedPerson({ name: '', contact: '', mealBoxAssigned: '', otherDetails: '' });
          setSelectedPersonId(null);
        })
        .catch((error) => {
          console.error('Error updating delivery personnel:', error);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Manage Delivery Personnel
      </Typography>

      {/* Add Delivery Personnel */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Add New Delivery Personnel</Typography>
            <TextField
              label="Name"
              name="name"
              value={newPerson.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact Info"
              name="contact"
              value={newPerson.contact}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Meal Box Assigned"
              name="mealBoxAssigned"
              value={newPerson.mealBoxAssigned}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Other Details"
              name="otherDetails"
              value={newPerson.otherDetails}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleAddPersonnel}
            >
              Add Personnel
            </Button>
          </Paper>
        </Grid>

        {/* Update Delivery Personnel */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Update Delivery Personnel</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Personnel</InputLabel>
              <Select
                value={selectedPersonId || ''}
                onChange={(e) => setSelectedPersonId(e.target.value)}
              >
                {deliveryPersonnel.map((person) => (
                  <MenuItem key={person._id} value={person._id}>
                    {person.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedPersonId && (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={updatedPerson.name || ''}
                  onChange={handleUpdateInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Contact Info"
                  name="contact"
                  value={updatedPerson.contact || ''}
                  onChange={handleUpdateInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Meal Box Assigned"
                  name="mealBoxAssigned"
                  value={updatedPerson.mealBoxAssigned || ''}
                  onChange={handleUpdateInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Other Details"
                  name="otherDetails"
                  value={updatedPerson.otherDetails || ''}
                  onChange={handleUpdateInputChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={handleUpdatePersonnel}
                >
                  Update Personnel
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* List of Delivery Personnel */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
          <Typography variant="h6">Delivery Personnel List</Typography>
          <List>
            {deliveryPersonnel.map((person) => (
              <ListItem key={person._id}>
                <ListItemText
                  primary={person.name}
                  secondary={`Assigned To: ${person.assignedTo}, Meal Box: ${person.mealBoxId}}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Container>
  );
};

export default ManageDeliveryPersonnel;

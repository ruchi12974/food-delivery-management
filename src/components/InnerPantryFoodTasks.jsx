import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';


// The task update status options
const preparationStatuses = ['Pending', 'In Progress', 'Completed'];

const InnerPantryFoodTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Fetch assigned meal preparation tasks from the API
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/tasks')
      .then((response) => {
        setTasks(response.data); // Assuming the response data contains an array of tasks
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Handle status change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Handle task update status
  const handleUpdateStatus = (taskId) => {
    if (selectedStatus) {
      axios
        .put(`http://localhost:5001/api/tasks/${taskId}`, { status: selectedStatus })
        .then((response) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === taskId ? { ...task, status: selectedStatus } : task
            )
          );
          setSelectedStatus(''); // Clear the status field after update
          setSelectedTaskId(null);
        })
        .catch((error) => {
          console.error('Error updating task status:', error);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Food Preparation Tasks
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Assigned Meal Preparation Tasks</Typography>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Grid container spacing={2} key={task._id}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                      <Typography variant="subtitle1">Task: {task.taskName}</Typography>
                      <Typography variant="body2">Assigned To: {task.assignedTo.name}</Typography>
                      <Typography variant="body2">Status: {task.status}</Typography>
                      <FormControl fullWidth sx={{ marginTop: 1 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          label="Status"
                          value={selectedTaskId === task._id ? selectedStatus : task.status}
                          onChange={handleStatusChange}
                          disabled={selectedTaskId !== task._id}
                        >
                          {preparationStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() => {
                          setSelectedTaskId(task._id);
                          setSelectedStatus(task.status);
                        }}
                      >
                        Update Status
                      </Button>

                      {selectedTaskId === task._id && (
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          sx={{ marginTop: 1 }}
                          onClick={() => handleUpdateStatus(task._id)}
                        >
                          Confirm Update
                        </Button>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No tasks assigned.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InnerPantryFoodTasks;

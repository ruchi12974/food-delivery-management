import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const DietChartForm = () => {
  const [dietCharts, setDietCharts] = useState([]);
  const [currentChart, setCurrentChart] = useState({
    patientId: "",
    morning: "",
    evening: "",
    night: "",
    instructions: "",
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const API_URL = "http://localhost:5001/api/diet-charts";

  // Fetch all diet charts
  const fetchDietCharts = async () => {
    const response = await axios.get(API_URL);
    setDietCharts(response.data);
  };

  // Handle form field change
  const handleChange = (e) => {
    setCurrentChart({ ...currentChart, [e.target.name]: e.target.value });
  };

  // Add or update diet chart
  const handleSubmit = async () => {
    if (editMode) {
      await axios.put(`${API_URL}/${currentChart.patientId}`, currentChart);
    } else {
      await axios.post(API_URL, currentChart);
    }
    fetchDietCharts();
    setOpen(false);
    setCurrentChart({ patientId: "", morning: "", evening: "", night: "", instructions: "" });
    setEditMode(false);
  };

  // Edit diet chart
  const handleEdit = (chart) => {
    setCurrentChart(chart);
    setEditMode(true);
    setOpen(true);
  };

  // Delete diet chart
  const handleDelete = async (patientId) => {
    await axios.delete(`${API_URL}/${patientId}`);
    fetchDietCharts();
  };

  useEffect(() => {
    fetchDietCharts();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Diet Chart Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
          setEditMode(false);
        }}
        sx={{ mb: 2 }}
      >
        Add Diet Chart
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Morning</TableCell>
              <TableCell>Evening</TableCell>
              <TableCell>Night</TableCell>
              <TableCell>Instructions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dietCharts.map((chart) => (
              <TableRow key={chart.patientId._id}>
                <TableCell>{chart.patientId._id}</TableCell>
                <TableCell>{chart.morningMeal[0].mealName}</TableCell>
                <TableCell>{chart.eveningMeal[0].mealName}</TableCell>
                <TableCell>{chart.nightMeal[0].mealName}</TableCell>
                <TableCell>{chart.morningMeal[0].instructions}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(chart)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(chart.patientId)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editMode ? "Edit Diet Chart" : "Add Diet Chart"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Patient ID"
            name="patientId"
            value={currentChart.patientId}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={editMode}
          />
          <TextField
            label="Morning Meal"
            name="morning"
            value={currentChart.morning}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Evening Meal"
            name="evening"
            value={currentChart.evening}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Night Meal"
            name="night"
            value={currentChart.night}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Instructions"
            name="instructions"
            value={currentChart.instructions}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DietChartForm;









/* import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { updateDietChart } from '../services/api';

const DietChartForm = ({ patientId }) => {
  const [diet, setDiet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDietChart(patientId, { diet });
      alert('Diet updated successfully!');
    } catch (error) {
      console.error('Failed to update diet:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6">Update Diet Chart</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Diet Details"
          variant="outlined"
          fullWidth
          margin="normal"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default DietChartForm;
*/
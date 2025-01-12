import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    diseases: '',
    allergies: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
  });

  const API_URL = 'http://localhost:5001/api/patients';

  // Fetch Patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(API_URL);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  // Handle Add or Update Patient
  const handleSavePatient = async () => {
    try {
      if (currentPatient) {
        await axios.put(`${API_URL}/${currentPatient._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      // Refresh Patients
      const response = await axios.get(API_URL);
      setPatients(response.data);
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  // Handle Delete Patient
  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Open Dialog
  const handleOpenDialog = (patient = null) => {
    setCurrentPatient(patient);
    setFormData(
      patient || {
        name: '',
        diseases: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: '',
      }
    );
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setCurrentPatient(null);
    setFormData({
      name: '',
      diseases: '',
      allergies: '',
      roomNumber: '',
      bedNumber: '',
      floorNumber: '',
      age: '',
      gender: '',
      contactInfo: '',
      emergencyContact: '',
    });
    setOpenDialog(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Patients
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Add Patient
      </Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Diseases</TableCell>
              <TableCell>Allergies</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>{patient.diseases}</TableCell>
                <TableCell>{patient.allergies}</TableCell>
                <TableCell>{patient.roomNumber}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(patient)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeletePatient(patient._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentPatient ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Diseases"
            value={formData.diseases}
            onChange={(e) =>
              setFormData({ ...formData, diseases: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Allergies"
            value={formData.allergies}
            onChange={(e) =>
              setFormData({ ...formData, allergies: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Room Number"
            value={formData.roomNumber}
            onChange={(e) =>
              setFormData({ ...formData, roomNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bed Number"
            value={formData.bedNumber}
            onChange={(e) =>
              setFormData({ ...formData, bedNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Floor Number"
            value={formData.floorNumber}
            onChange={(e) =>
              setFormData({ ...formData, floorNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Information"
            value={formData.contactInfo}
            onChange={(e) =>
              setFormData({ ...formData, contactInfo: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Emergency Contact"
            value={formData.emergencyContact}
            onChange={(e) =>
              setFormData({ ...formData, emergencyContact: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSavePatient} color="primary">
            {currentPatient ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientTable;

















/* import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material';
import { fetchPatients } from '../services/api';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };
    getPatients();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Condition</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
 
export default PatientTable;
 */
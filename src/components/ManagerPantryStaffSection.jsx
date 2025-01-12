import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const ManagerPantryStaffSection = () => {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formValues, setFormValues] = useState({
    staffName: "",
    contactInfo: "",
    location: "",
  });

  const fetchPantryStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/pantry-staff");
      setPantryStaff(response.data);
    } catch (error) {
      console.error("Error fetching pantry staff:", error);
    }
  };

  const handleDialogOpen = (staff = null) => {
    setEditingStaff(staff);
    setFormValues(staff || { staffName: "", contactInfo: "", location: "" });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingStaff(null);
    setFormValues({ staffName: "", contactInfo: "", location: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      if (editingStaff) {
        // Update staff
        await axios.put(
          `http://localhost:5001/api/pantry-staff/${editingStaff._id}`,
          formValues
        );
      } else {
        // Add new staff
        await axios.post("http://localhost:5001/api/pantry-staff", formValues);
      }
      fetchPantryStaff();
      handleDialogClose();
    } catch (error) {
      console.error("Error saving pantry staff:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/pantry-staff/${id}`);
      fetchPantryStaff();
    } catch (error) {
      console.error("Error deleting pantry staff:", error);
    }
  };

  useEffect(() => {
    fetchPantryStaff();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Manage Inner Pantry
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
        Add Pantry Staff
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff Name</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantryStaff.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.contactInfo.phone}</TableCell>
                <TableCell>{staff.contactInfo.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleDialogOpen(staff)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(staff._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {editingStaff ? "Edit Pantry Staff" : "Add Pantry Staff"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Staff Name"
            fullWidth
            name="staffName"
            value={formValues.staffName}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Contact Info"
            fullWidth
            name="contactInfo"
            value={formValues.contactInfo}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            name="location"
            value={formValues.location}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerPantryStaffSection;

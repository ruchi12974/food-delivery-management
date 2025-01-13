import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const MealTrackingSection = () => {
  const [tasks, setTasks] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch meal preparation tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://hospital-food-management-backend.onrender.com/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching meal preparation tasks:", error);
    }
  };

  // Fetch delivery statuses
  const fetchDeliveries = async () => {
    try {
      const response = await axios.get("https://hospital-food-management-backend.onrender.com/api/deliveries");
      setDeliveries(response.data);
    } catch (error) {
      console.error("Error fetching delivery statuses:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTasks();
      await fetchDeliveries();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Track Meal Preparation and Delivery
      </Typography>

      {/* Meal Preparation Section */}
      <Typography variant="h5" mb={2}>
        Meal Preparation Status
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>AssignedToId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    color={
                      task.status === "Completed"
                        ? "success"
                        : task.status === "In Progress"
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>{task.assignedTo.name}</TableCell>
                <TableCell>{task.assignedTo._id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delivery Status Section */}
      <Typography variant="h5" mt={4} mb={2}>
        Delivery Status
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meal Box Id</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery Time</TableCell>
              <TableCell>Assigned TO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery._id}>
                <TableCell>{delivery.mealBoxId}</TableCell>
                <TableCell>
                  <Chip
                    label={delivery.deliveryStatus}
                    color={
                      delivery.status === "Delivered"
                        ? "success"
                        : delivery.status === "In Transit"
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>{delivery.deliveryTime}</TableCell>
                <TableCell>{delivery.assignedTo.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MealTrackingSection;

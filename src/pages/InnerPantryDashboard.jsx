
import DeliveryPersonnelDashboard from './DeliveryPersonnelDashboard';
import InnerPantryFoodTasks from '../components/InnerPantryFoodTasks';
import ManageDeliveryPersonnel from '../components/ManageDeliveryPersonnel';
import Header from '../components/Header'
import {
  Box,
  Typography,
} from '@mui/material';


const InnerPantryDashboard = () => (
  <><Header/>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Inner Pantry Dashboard
      </Typography>

      {/* Food Preparation Tasks */}
      <InnerPantryFoodTasks/>
      <ManageDeliveryPersonnel/>
      {/* Meal Delivery Tracking */}
      <DeliveryPersonnelDashboard />
    </Box>
    </>
  );

export default InnerPantryDashboard;













/* import React, { useEffect, useState } from 'react';
import { foodPreprationTask, foodPreparaionTaskStatus, fetchDeliveryTasks, addDeliveryPersonal, updateDeliveryPersonal, fetchPantryTasks } from '../services/api'; // Assuming you have an api.js file
import DeliveryPersonnelDashboard from './DeliveryPersonnelDashboard';
import FoodPreparationTasks from './FoodPreparationTasks';

const InnerPantryDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [pantryTasks, setPantryTasks] = useState([]);
  const [newDeliveryPerson, setNewDeliveryPerson] = useState({ name: '', id: '' });
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // Fetch Food Preparation Tasks
  useEffect(() => {
    const loadTasks = async () => {
      const data = await foodPreprationTask();
      setTasks(data);
    };
    loadTasks();
  }, []);

  // Fetch Delivery Personnel
  useEffect(() => {
    const loadDeliveryTasks = async () => {
      const data = await fetchDeliveryTasks();
      setDeliveryPersonnel(data);
    };
    loadDeliveryTasks();
  }, []);

  // Fetch Pantry Staff Tasks
  useEffect(() => {
    const loadPantryTasks = async () => {
      const data = await fetchPantryTasks();
      setPantryTasks(data);
    };
    loadPantryTasks();
  }, []);


  // Add Delivery Personnel
  const handleAddDeliveryPersonnel = async () => {
    const data = await addDeliveryPersonal(newDeliveryPerson);
    setDeliveryPersonnel([...deliveryPersonnel, data]);
    setNewDeliveryPerson({ name: '' , id: '' }); // Reset form fields
  };

  // Update Delivery Personnel
  const handleUpdateDeliveryPersonnel = async (personId, assignedTo) => {
    const data = await updateDeliveryPersonal(personId, assignedTo);
    setDeliveryPersonnel(deliveryPersonnel.map(person => person._id === personId ? data : person));
  };

  return (
    <div className="inner-pantry-dashboard">
      <h2>Inner Pantry Dashboard</h2>
      
      {/* Food Preparation Tasks 
      <FoodPreparationTasks />

      {/* Delivery Personnel */
      /* 
      <div className="delivery-personnel-section">
        <h3>Delivery Personnel</h3>
        <ul>
          {deliveryPersonnel.map(person => (
            <li key={person._id}>
              <input
            type="text"
            placeholder="Name"
            value={person._id}
            onChange={(e) => handleUpdateDeliveryPersonnel({ ...newDeliveryPerson, name: e.target.value })}
          />
          <button onClick={handleAddDeliveryPersonnel}>Add</button>
              <span>{person.assignedTo.name} - {person.assignedTo._id}</span>
              <button onClick={() => handleUpdateDeliveryPersonnel(person._id, person.assignedTo)}>Update</button>
            </li>
          ))}
        </ul>

      
        <div className="add-delivery-personal">
          <h4>Add New Delivery Personnel</h4>
          <input
            type="text"
            placeholder="Name"
            value={newDeliveryPerson.name}
            onChange={(e) => setNewDeliveryPerson({ ...newDeliveryPerson, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={newDeliveryPerson.id}
            onChange={(e) => setNewDeliveryPerson({ ...newDeliveryPerson, contactInfo: e.target.value })}
          />
          <button onClick={handleAddDeliveryPersonnel}>Add</button>
        </div>
      </div>

      

      
      <DeliveryPersonnelDashboard />
    </div>
  );
};

export default InnerPantryDashboard;


*/
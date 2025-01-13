import axios from 'axios';

const API_URL = 'https://hospital-food-management-backend.onrender.com/api'; // Adjust according to your backend

// Existing functions (for reference)

export const foodPreprationTask = async () => {
  const response = await axios.get(`${API_URL}/tasks`) ;
  return response.data;
}

export const foodPreparaionTaskStatus = async (taskId) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, {});
  return response.data;
};

export const fetchDeliveryTasks = async () => {
  const response = await axios.get(`${API_URL}/deliveries`); // Adjust the endpoint as needed
  return response.data;
};

export const addDeliveryPersonal = async (deliveryPersonnelDetail) => {
  const response = await axios.post(`${API_URL}/pantry-staff`, {deliveryPersonnelDetail}); 
  return response.data;
};

export const updateDeliveryPersonal = async (personId, assignedTo) => {
  const response = await axios.put(`${API_URL}/deliveries/${personId}`, {assignedTo}); 
  return response.data;
};

export const updatePantryPersonal = async (personId, pantryPersonalDetails) => {
  const response = await axios.put(`${API_URL}/pantry-staff/${personId}`, {pantryPersonalDetails}); 
  return response.data;
};


export const fetchPantryTasks = async () => {
  const response = await axios.get(`${API_URL}/pantry-staff`);
  return response.data;
}

export const fetchPatients = async () => {
  const response = await axios.get(`${API_URL}/patients`);
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const markMealDelivered = async (taskId) => {
  const response = await axios.put(`${API_URL}/deliveries/${taskId}`, { deliveryStatus: "Delivered" });
  return response.data;
};

export const updateDietChart = async (patientId, dietDetails) => {
  const response = await axios.put(`${API_URL}/update-diet`, { patientId, dietDetails });
  return response.data;
};

export default axios;


/* import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Set up an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service Functions

// Login
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Fetch Patients
export const fetchPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

// Add or Update Diet Chart
export const updateDietChart = async (patientId, dietData) => {
  const response = await api.put(`/patients/${patientId}/diet`, dietData);
  return response.data;
};

// Fetch Pantry Tasks
export const fetchPantryTasks = async () => {
  const response = await api.get('/pantry/tasks');
  return response.data;
};

// Mark Meal as Delivered
export const markMealDelivered = async (deliveryId) => {
  const response = await api.patch(`/delivery/${deliveryId}`, { status: 'Delivered' });
  return response.data;
};

export default api;
*/

import { Container, Typography, Grid, Paper } from '@mui/material';
import ManagerPantryStaffSection from '../components/ManagerPantryStaffSection';
import DietChartForm from '../components/DietChartForm'
import PatientTable from '../components/PatientTable';
import MealTrackingSection from '../components/MealTrackingSection';
import Header from '../components/Header';


const HospitalManagerDashboard = () => (
<Container>
  <Header />
      <Typography variant="h4" gutterBottom>
        Hospital Manager Dashboard
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Patient Details</Typography>
            <PatientTable />
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Diet Chart Details</Typography>
            <DietChartForm />
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Pantry Staff Details</Typography>
            <ManagerPantryStaffSection />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Delivery Tasks</Typography>
            <MealTrackingSection />
          </Paper>
        </Grid>
        
      </Grid>
    </Container>
  ) 

export default HospitalManagerDashboard;

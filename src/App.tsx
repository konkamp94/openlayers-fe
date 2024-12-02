import { useContext, useEffect, useState } from 'react'
import { Box, Paper, Tab, Tabs } from '@mui/material'
import './App.css'
import HomeMap from './components/open-layers/HomeMap'
import Grid2 from '@mui/material/Grid2';
import { LocationsContext } from './context/locations.context';
import CalculateRoute from './components/calculate-route/CalculateRoute';
import LocationList from './components/locations/LocationList';
import UserLocationList from './components/locations/UserLocationList';

function App() {
  const { isLoading } = useContext(LocationsContext)
  const [tabValue, setTabValue] = useState('user-locations')

  return (
    <>
    {isLoading ? <div>Loading...</div> :
      <Grid2 container spacing={2}>
        <Grid2 size={{xs:12}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue === 'user-locations' ? 0 : 1} aria-label="nav-tabs">
            <Tab label="User Locations"  onClick={() => setTabValue('user-locations')}/>
            <Tab label="Calculate Route"  onClick={() => setTabValue('calculate-route')}/>
          </Tabs>
        </Box>
        </Grid2>
        <Grid2 size={{xs: 12}}>
          <Paper>
            <HomeMap/>
          </Paper>
        </Grid2>
        <Grid2 size={{xs: 12}}>
            {tabValue === 'user-locations' ? 
              <UserLocationList/> : <CalculateRoute/>}
        </Grid2>
      </Grid2>
      }
    </>
  )
}

export default App

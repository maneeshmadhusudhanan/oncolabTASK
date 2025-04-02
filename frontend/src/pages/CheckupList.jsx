import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CheckupList = () => {
  const [checkups, setCheckups] = useState([]);

  const fetchCheckups = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkups`);
      const { checkups: fetchedCheckups } = await response.json();
      setCheckups(fetchedCheckups);
    } catch (err) {
      console.error('Error fetching checkups:', err);
    }
  }, []);

  useEffect(() => {
    fetchCheckups();
  }, [fetchCheckups]);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Checkups</Typography>
        <Button
          variant="contained"
        >
          New Checkup
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checkups.map((checkup) => (
                <TableRow key={checkup._id}>
                  <TableCell>
                    {new Date(checkup.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {checkup.patient.firstName} {checkup.patient.lastName}
                    <Typography variant="caption" display="block">
                      ID: {checkup.patient.patientId}
                    </Typography>
                  </TableCell>
                  <TableCell>{checkup.type}</TableCell>
                  <TableCell>
                    {checkup.doctor.firstName} {checkup.doctor.lastName}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{checkup.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        </Box>
      </Paper>
    </Box>
  );
};

export default CheckupList;

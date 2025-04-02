import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { checkupApi } from '../services/api';

const Checkups = () => {
  const navigate = useNavigate();
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCheckups = async () => {
      try {
        const response = await checkupApi.getAll();
        setCheckups(response.data);
      } catch (err) {
        setError('Failed to fetch checkups');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckups();
  }, []);

  const handleDelete = async (checkupId) => {
    if (!window.confirm('Are you sure you want to delete this checkup?')) {
      return;
    }

    try {
      await checkupApi.delete(checkupId);
      setCheckups(checkups.filter(checkup => checkup._id !== checkupId));
    } catch (err) {
      setError('Failed to delete checkup');
    }
  };

  const handleEdit = (checkupId) => {
    navigate(`/checkups/${checkupId}`);
  };

  const handleNewCheckup = () => {
    navigate('/checkups/new');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography component="h1" variant="h6" color="primary" gutterBottom>
              Medical Checkups
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleNewCheckup}
            >
              New Checkup
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Paper sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : checkups.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No checkups found
                      </TableCell>
                    </TableRow>
                  ) : (
                    checkups.map((checkup) => (
                      <TableRow key={checkup._id}>
                        <TableCell>
                          {checkup.patient.firstName} {checkup.patient.lastName}
                        </TableCell>
                        <TableCell>
                          {new Date(checkup.checkupDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {checkup.doctorName}
                        </TableCell>
                        <TableCell>
                          {checkup.type}
                        </TableCell>
                        <TableCell>
                          {checkup.status}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(checkup._id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(checkup._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkups;

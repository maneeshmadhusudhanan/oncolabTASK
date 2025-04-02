import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { checkupApi, patientApi } from '../services/api';

const CheckupForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    patientId: '',
    type: '',
    vitalSigns: {
      bloodPressure: {
        systolic: '',
        diastolic: '',
      },
      temperature: '',
      pulseRate: '',
    },
    symptoms: [],
    notes: {
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
    },
  });
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientApi.getAll();
        setPatients(response.data);
      } catch (err) {
        setError('Failed to fetch patients');
      }
    };

    const fetchCheckup = async () => {
      if (!id) return;
      try {
        const response = await checkupApi.getById(id);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch checkup');
      }
    };

    fetchPatients();
    fetchCheckup();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVitalSignsChange = (e) => {
    const { name, value } = e.target;
    const [category, subCategory] = name.split('.');
    setFormData({
      ...formData,
      vitalSigns: {
        ...formData.vitalSigns,
        [subCategory]: {
          ...formData.vitalSigns[subCategory],
          [category]: value,
        },
      },
    });
  };

  const handleNotesChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      notes: {
        ...formData.notes,
        [name]: value,
      },
    });
  };

  const addSymptom = () => {
    setFormData({
      ...formData,
      symptoms: [...formData.symptoms, { description: '', severity: 'mild', duration: '' }],
    });
  };

  const removeSymptom = (index) => {
    const newSymptoms = [...formData.symptoms];
    newSymptoms.splice(index, 1);
    setFormData({ ...formData, symptoms: newSymptoms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (id) {
        await checkupApi.update(id, formData);
      } else {
        await checkupApi.create(formData);
      }
      navigate('/checkups');
    } catch (err) {
      setError('Failed to save checkup');
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
          {id ? 'Edit Checkup' : 'New Checkup'}
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Patient</InputLabel>
            <Select
              value={formData.patientId}
              onChange={handleChange}
              label="Patient"
            >
              {patients.map((patient) => (
                <MenuItem key={patient._id} value={patient._id}>
                  {patient.firstName} {patient.lastName} ({patient.patientId})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value="routine">Routine</MenuItem>
              <MenuItem value="follow-up">Follow-up</MenuItem>
              <MenuItem value="emergency">Emergency</MenuItem>
              <MenuItem value="lab-test">Lab Test</MenuItem>
              <MenuItem value="imaging">Imaging</MenuItem>
            </Select>
          </FormControl>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vital Signs
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Blood Pressure (Systolic)"
                  name="bloodPressure.systolic"
                  type="number"
                  value={formData.vitalSigns.bloodPressure.systolic}
                  onChange={handleVitalSignsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Blood Pressure (Diastolic)"
                  name="bloodPressure.diastolic"
                  type="number"
                  value={formData.vitalSigns.bloodPressure.diastolic}
                  onChange={handleVitalSignsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Temperature (°C)"
                  name="temperature"
                  type="number"
                  value={formData.vitalSigns.temperature}
                  onChange={handleVitalSignsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pulse Rate (bpm)"
                  name="pulseRate"
                  type="number"
                  value={formData.vitalSigns.pulseRate}
                  onChange={handleVitalSignsChange}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Symptoms</Typography>
              <Button startIcon={<AddIcon />} onClick={addSymptom}>
                Add Symptom
              </Button>
            </Box>
            <List>
              {formData.symptoms.map((symptom, index) => (
                <ListItem key={index} divider>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={symptom.description}
                        onChange={(e) => {
                          const newSymptoms = [...formData.symptoms];
                          newSymptoms[index].description = e.target.value;
                          setFormData({ ...formData, symptoms: newSymptoms });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Severity</InputLabel>
                        <Select
                          value={symptom.severity}
                          onChange={(e) => {
                            const newSymptoms = [...formData.symptoms];
                            newSymptoms[index].severity = e.target.value;
                            setFormData({ ...formData, symptoms: newSymptoms });
                          }}
                        >
                          <MenuItem value="mild">Mild</MenuItem>
                          <MenuItem value="moderate">Moderate</MenuItem>
                          <MenuItem value="severe">Severe</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Duration"
                        value={symptom.duration}
                        onChange={(e) => {
                          const newSymptoms = [...formData.symptoms];
                          newSymptoms[index].duration = e.target.value;
                          setFormData({ ...formData, symptoms: newSymptoms });
                        }}
                      />
                    </Grid>
                  </Grid>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => removeSymptom(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notes (SOAP)
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Subjective"
                  name="subjective"
                  value={formData.notes.subjective}
                  onChange={handleNotesChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Objective"
                  name="objective"
                  value={formData.notes.objective}
                  onChange={handleNotesChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Assessment"
                  name="assessment"
                  value={formData.notes.assessment}
                  onChange={handleNotesChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Plan"
                  name="plan"
                  value={formData.notes.plan}
                  onChange={handleNotesChange}
                />
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {id ? 'Update Checkup' : 'Create Checkup'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/checkups')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckupForm;

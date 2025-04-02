import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { checkupApi, billingApi } from '../services/api';

const Reports = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [checkupReports, setCheckupReports] = useState([]);
  const [billingReports, setBillingReports] = useState([]);
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchCheckupReports = async () => {
    try {
      const response = await checkupApi.getReports();
      setCheckupReports(response.data);
    } catch (err) {
      setError('Failed to fetch checkup reports');
    }
  };

  const fetchBillingReports = async () => {
    try {
      const response = await billingApi.getReports();
      setBillingReports(response.data);
    } catch (err) {
      setError('Failed to fetch billing reports');
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      const promises = [fetchCheckupReports(), fetchBillingReports()];
      await Promise.all(promises);
    };

    fetchReports();
  }, []);

  const handleDownload = (report) => {
    // Implement report download logic here
    console.log('Downloading report:', report);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography component="h1" variant="h6" color="primary" gutterBottom>
              Reports & Analytics
            </Typography>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Paper sx={{ p: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Checkup Reports" />
              <Tab label="Billing Reports" />
            </Tabs>

            {activeTab === 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkupReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No checkup reports found
                        </TableCell>
                      </TableRow>
                    ) : (
                      checkupReports.map((report) => (
                        <TableRow key={report._id}>
                          <TableCell>
                            {report.patient.firstName} {report.patient.lastName}
                          </TableCell>
                          <TableCell>
                            {new Date(report.checkupDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {report.doctorName}
                          </TableCell>
                          <TableCell>
                            {report.type}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={report.status}
                              color={report.status === 'completed' ? 'success' : 'warning'}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleDownload(report)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billingReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No billing reports found
                        </TableCell>
                      </TableRow>
                    ) : (
                      billingReports.map((report) => (
                        <TableRow key={report._id}>
                          <TableCell>
                            {report.patient.firstName} {report.patient.lastName}
                          </TableCell>
                          <TableCell>
                            {new Date(report.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            ${report.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={report.status}
                              color={report.status === 'paid' ? 'success' : 'warning'}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleDownload(report)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;

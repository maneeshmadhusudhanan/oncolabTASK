import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  styled,
} from '@mui/material';
import {
  MedicalServices as MedicalIcon,
  LocalHospital as HospitalIcon,
  Receipt as BillingIcon,
  Assessment as AnalyticsIcon,
} from '@mui/icons-material';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MedicalIcon sx={{ fontSize: 40 }} />,
      title: 'Medical Services',
      description: 'Comprehensive medical diagnostics and testing',
      path: '/login',
    },
    {
      icon: <HospitalIcon sx={{ fontSize: 40 }} />,
      title: 'Patient Care',
      description: 'High-quality patient care and management',
      path: '/login',
    },
    {
      icon: <BillingIcon sx={{ fontSize: 40 }} />,
      title: 'Billing & Insurance',
      description: 'Streamlined billing and insurance processing',
      path: '/login',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Analytics & Reports',
      description: 'Advanced analytics and reporting tools',
      path: '/login',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          ONCOLAB Medical Diagnostics
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Your trusted partner in medical diagnostics and patient care
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <FeatureCard>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(feature.path)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  styled,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as CheckupIcon,
  Receipt as BillingIcon,
  Assessment as AssessmentIcon,
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

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Patient Management',
      description: 'Efficiently manage patient records and medical history',
      path: '/patients',
    },
    {
      icon: <CheckupIcon sx={{ fontSize: 40 }} />,
      title: 'Medical Checkups',
      description: 'Track and manage medical checkups and appointments',
      path: '/checkups',
    },
    {
      icon: <BillingIcon sx={{ fontSize: 40 }} />,
      title: 'Billing System',
      description: 'Streamlined billing and payment processing',
      path: '/billing',
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      title: 'Reports & Analytics',
      description: 'Generate comprehensive medical reports',
      path: '/reports',
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
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
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
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
  );
};

export default Home;

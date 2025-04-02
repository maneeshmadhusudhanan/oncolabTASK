import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  styled,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as CheckupIcon,
  Receipt as BillingIcon,
  Assessment as AssessmentIcon,
  Menu as MenuIcon,
  ExitToApp as ExitIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
    { text: 'Checkups', icon: <CheckupIcon />, path: '/checkups' },
    { text: 'Billing', icon: <BillingIcon />, path: '/billing' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          ONCOLAB
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button={true}
            key={item.text}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button={true} onClick={logout}>
          <ExitIcon />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo>
            <Typography variant="h6" component="div">
              ONCOLAB
            </Typography>
          </Logo>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;

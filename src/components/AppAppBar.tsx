import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from '@tanstack/react-router';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => navigate({ to: '/spellbook' })}>
                Spellbook
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => navigate({ to: '/world' })}>
                World
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => navigate({ to: '/duels' })}>
                Duels
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => navigate({ to: '/study' })}>
                Study
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => navigate({ to: '/tournament' })}>
                Tournament
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {user ? (
              <>
                <Button color="primary" variant="text" size="small" onClick={handleLogout}>
                  Logout
                </Button>
                <Button color="primary" variant="contained" size="small" onClick={() => navigate({ to: '/account' })}>
                  My Account
                </Button>
              </>
            ) : (
              <>
                <Button color="primary" variant="text" size="small" onClick={() => navigate({ to: '/login' })}>
                  Sign in
                </Button>
                <Button color="primary" variant="contained" size="small" onClick={() => navigate({ to: '/register' })}>
                  Register
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem onClick={() => navigate({ to: '/spellbook' })}>Spellbook</MenuItem>
                <MenuItem onClick={() => navigate({ to: '/world' })}>World</MenuItem>
                <MenuItem onClick={() => navigate({ to: '/duels' })}>Duels</MenuItem>
                <MenuItem onClick={() => navigate({ to: '/study' })}>Study</MenuItem>
                <MenuItem onClick={() => navigate({ to: '/tournament' })}>Tournament</MenuItem>
                <Divider sx={{ my: 3 }} />
                {user ? (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth onClick={handleLogout}>
                        Logout
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth onClick={() => navigate({ to: '/account' })}>
                        My Account
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth onClick={() => navigate({ to: '/register' })}>
                        Register
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth onClick={() => navigate({ to: '/login' })}>
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

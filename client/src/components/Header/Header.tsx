import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authTokenSelector } from '../../store/auth/authSelectors/authSelectors';
import { clearToken } from '../../store/auth/authSlice/authSlice';
import { useAppDispatch } from '../../store';
import './Header.scss';
import EditorSidebar from '../EditorSidebar';

const Header = () => {
  const token = useSelector(authTokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLoginButtonClick = () => navigate('/auth');

  const handleLogoutButtonClick = () => dispatch(clearToken());

  const handleEditorClick = () => {
    navigate('/editor');
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='toolbar'>
          <div className='headerSidebarWrapper'>
            {token && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                marginLeft: '20px',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#888',
                },
              }}
              onClick={() => navigate('/')}
            >
              Articles
            </Typography>
          </div>
          {token ? (
            <Button color="inherit" onClick={handleLogoutButtonClick}>
              Exit
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginButtonClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <EditorSidebar
        handleEditorClick={handleEditorClick}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Box>
  );
};

export default Header;

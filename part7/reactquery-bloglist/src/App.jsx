import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import loginService from './services/login';
import { Container, AppBar, Toolbar, Button } from '@mui/material';

import NotificationContext from './reducers/NotificationContext';
import blogRequests from './blogRequests';
import UserContext from './reducers/UserContext';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';

const App = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext);
  const [user, dispatchUser] = useContext(UserContext);
  const setUser = user => dispatchUser({ type: 'SET_USER', payload: user });

  notification;
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogRequests.setToken(user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      blogRequests.setToken(user.token);
      return 'success';
    } catch (error) {
      displayNotification('wrong username or password', 'red');
      return 'error';
    }
  };

  const displayNotification = (message, color) => {
    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: {
        message,
        color,
      },
    });
    setTimeout(() => {
      dispatchNotification({
        type: 'REMOVE_NOTIFICATION',
      });
    }, 5000);
  };

  const NavMenu = ({ handleLogout, name }) => (
    <div>
      <AppBar>
        <Toolbar>
          <Button color="inherit">
            <Link to="/">blogs</Link>
          </Button>
          <Button color="inherit">
            <Link to="/users">users</Link>
          </Button>
          {name} logged in{' '}
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <h2>blog app</h2>
    </div>
  );

  NavMenu.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const ContentSection = ({ handleLogout }) => {
    const [user, dispatchUser] = useContext(UserContext);
    dispatchUser;

    return (
      <Router>
        <NavMenu handleLogout={handleLogout} name={user.name} />
        <Routes>
          <Route path="/*" element={<Blogs />} />
          <Route path="/users/*" element={<Users />} />
        </Routes>
      </Router>
    );
  };

  ContentSection.propTypes = {
    handleLogout: PropTypes.func.isRequired,
  };

  return (
    <Container>
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && <ContentSection handleLogout={handleLogout} />}
    </Container>
  );
};

export default App;

import { Routes, Route, Link, useParams } from 'react-router-dom';
import { getUsers } from '../userRequests';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserViewContainer = ({ users }) => {
  const id = useParams().id;
  const user = users.find(n => n.id === id);

  return <UserView user={user} />;
};
UserViewContainer.propTypes = {
  users: PropTypes.array.isRequired,
};

const UserView = ({ user }) => {
  const blogs = user.blogs;
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
UserView.propTypes = {
  user: PropTypes.object.isRequired,
};

const UserList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

const Users = () => {
  const result = useQuery('users', getUsers);

  if (result.isLoading) return <div>still loading</div>;
  const users = result.data;

  return (
    <Routes>
      <Route path="/" element={<UserList users={users} />} />
      <Route path="/:id" element={<UserViewContainer users={users} />} />
    </Routes>
  );
};

export default Users;

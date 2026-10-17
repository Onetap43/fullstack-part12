import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const UsersView = ({ users }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Users
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Blogs created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)

export default UsersView

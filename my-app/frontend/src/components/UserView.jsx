import { Link } from 'react-router-dom'
import { Paper, Typography } from '@mui/material'

const UserView = ({ user }) => {
  if (!user) {
    return <Typography variant="h5">User not found</Typography>
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6">added blogs</Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </Paper>
  )
}

export default UserView

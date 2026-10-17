import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

const BlogList = ({ blogs }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Blogs
    </Typography>
    <List>
      {blogs.map((blog) => (
        <ListItem
          key={blog.id}
          divider
          component={Link}
          to={`/blogs/${blog.id}`}
        >
          <ListItemText
            primary={blog.title}
            secondary={`by ${blog.author} — ${blog.likes} likes`}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
)

export default BlogList

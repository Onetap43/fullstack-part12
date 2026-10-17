import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useField } from '../hooks'

const BlogView = ({
  blog,
  loggedInUser,
  handleLike,
  handleDelete,
  handleComment
}) => {
  const comment = useField('text')

  if (!blog) {
    return <Typography variant="h5">Blog not found</Typography>
  }

  const canDelete =
    blog.user && loggedInUser && blog.user.username === loggedInUser.username

  const addComment = async (event) => {
    event.preventDefault()
    const success = await handleComment(blog.id, comment.value)
    if (success) comment.reset()
  }

  return (
    <Box>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        ← Back to Blogs
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            by {blog.author}
          </Typography>
          <MuiLink href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </MuiLink>

          <Typography sx={{ mt: 2 }}>{blog.likes} likes</Typography>
          {loggedInUser && (
            <Button
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => handleLike(blog)}
            >
              Like
            </Button>
          )}

          <Typography>
            Added by {blog.user?.name || blog.user?.username}
          </Typography>
          {canDelete && (
            <Button
              color="error"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => handleDelete(blog)}
            >
              Remove
            </Button>
          )}

          <Typography variant="h5" sx={{ mt: 4 }}>
            comments
          </Typography>
          <Stack
            component="form"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ my: 2 }}
            onSubmit={addComment}
          >
            <TextField
              label="add a comment"
              value={comment.value}
              onChange={comment.onChange}
              fullWidth
            />
            <Button type="submit" variant="contained">
              add comment
            </Button>
          </Stack>
          <ul>
            {(blog.comments || []).map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BlogView

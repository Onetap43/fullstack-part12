import { useNavigate } from 'react-router-dom'
import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const navigate = useNavigate()

  const addBlog = async (event) => {
    event.preventDefault()

    const success = await createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })

    if (success) {
      title.reset()
      author.reset()
      url.reset()
      navigate('/')
    }
  }

  return (
    <Paper elevation={4} sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Blog
      </Typography>

      <Stack component="form" spacing={2} onSubmit={addBlog}>
        <TextField
          label="Title"
          value={title.value}
          onChange={title.onChange}
        />
        <TextField
          label="Author"
          value={author.value}
          onChange={author.onChange}
        />
        <TextField label="URL" value={url.value} onChange={url.onChange} />
        <Button variant="contained" type="submit" size="large">
          create
        </Button>
      </Stack>
    </Paper>
  )
}

export default BlogForm

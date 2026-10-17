import { Link } from 'react-router-dom'
import { Box, Button, Paper, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 8,
        p: 5,
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontSize: {
            xs: '5rem',
            md: '8rem'
          },
          fontWeight: 'bold'
        }}
      >
        404
      </Typography>

      <Typography variant="h4" gutterBottom>
        Page not found
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you requested does not exist.
      </Typography>

      <Box>
        <Button component={Link} to="/" variant="contained">
          Return to blogs
        </Button>
      </Box>
    </Paper>
  )
}

export default NotFound

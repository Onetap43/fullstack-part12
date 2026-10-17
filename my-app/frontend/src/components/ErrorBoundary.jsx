import { Component } from 'react'
import { Alert, Box, Button, Typography } from '@mui/material'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
            mt: 8
          }}
        >
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>

            <Typography sx={{ mb: 2 }}>
              The application encountered an unexpected error.
            </Typography>

            <Button
              variant="contained"
              color="error"
              onClick={this.handleReload}
            >
              Reload application
            </Button>
          </Alert>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

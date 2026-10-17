import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const submit = async (event) => {
    event.preventDefault()
    const success = await handleLogin(username.value, password.value)

    if (success) {
      username.reset()
      password.reset()
    }
  }

  const usernameInput = {
    type: username.type,
    value: username.value,
    onChange: username.onChange
  }
  const passwordInput = {
    type: password.type,
    value: password.value,
    onChange: password.onChange
  }

  return (
    <Paper elevation={4} sx={{ maxWidth: 420, mx: 'auto', mt: 5, p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <Stack component="form" spacing={2} onSubmit={submit}>
        <TextField label="Username" data-testid="username" {...usernameInput} />
        <TextField label="Password" data-testid="password" {...passwordInput} />
        <Button variant="contained" type="submit" size="large">
          Login
        </Button>
      </Stack>
    </Paper>
  )
}

export default LoginForm

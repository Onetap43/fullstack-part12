import { useEffect } from 'react'
import {
  Link,
  Navigate,
  Route,
  Routes,
  useMatch,
  useNavigate
} from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from '@mui/material'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import ErrorBoundary from './components/ErrorBoundary'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserView from './components/UserView'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import persistentUser from './services/persistentUser'
import { useNotification } from './contexts/NotificationContext'
import { useUser } from './contexts/UserContext'

const App = () => {
  const [user, userDispatch] = useUser()
  const { notification, showNotification } = useNotification()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  })

  const blogs = blogsResult.data || []
  const users = usersResult.data || []
  const blogMatch = useMatch('/blogs/:id')
  const userMatch = useMatch('/users/:id')
  const selectedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null
  const selectedUser = userMatch
    ? users.find((item) => item.id === userMatch.params.id)
    : null

  useEffect(() => {
    try {
      const savedUser = persistentUser.getUser()
      if (savedUser) {
        userDispatch({ type: 'LOGIN', payload: savedUser })
        blogService.setToken(savedUser.token)
      }
    } catch {
      persistentUser.removeUser()
    }
  }, [userDispatch])

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (createdBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) => old.concat(createdBlog))
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.filter((blog) => blog.id !== id)
      )
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    }
  })

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      persistentUser.saveUser(loggedUser)
      blogService.setToken(loggedUser.token)
      userDispatch({ type: 'LOGIN', payload: loggedUser })
      navigate('/')
      return true
    } catch {
      showNotification('wrong username or password', 'error')
      return false
    }
  }

  const handleLogout = () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    userDispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const addBlog = async (blog) => {
    try {
      await createMutation.mutateAsync(blog)
      return true
    } catch {
      showNotification('creating a blog failed', 'error')
      return false
    }
  }

  const likeBlog = async (blog) => {
    try {
      await updateMutation.mutateAsync({
        id: blog.id,
        blog: {
          ...blog,
          likes: blog.likes + 1,
          user: blog.user?.id ?? blog.user
        }
      })
    } catch {
      showNotification(`could not like ${blog.title}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return

    try {
      await deleteMutation.mutateAsync(blog.id)
      showNotification(`blog ${blog.title} by ${blog.author} removed`)
      navigate('/')
    } catch {
      showNotification(`could not remove ${blog.title}`, 'error')
    }
  }

  const addComment = async (id, comment) => {
    if (!comment.trim()) return false

    try {
      await commentMutation.mutateAsync({ id, comment })
      return true
    } catch {
      showNotification('could not add comment', 'error')
      return false
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create">
              New Blog
            </Button>
          )}
          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <>
              <Typography sx={{ mx: 2 }}>{user.name} logged in</Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box mt={3}>
        <Notification message={notification.message} type={notification.type} />
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                blogsResult.isLoading ? (
                  <Typography>loading blogs...</Typography>
                ) : (
                  <BlogList blogs={sortedBlogs} />
                )
              }
            />
            <Route
              path="/users"
              element={
                usersResult.isLoading ? (
                  <Typography>loading users...</Typography>
                ) : (
                  <UsersView users={users} />
                )
              }
            />
            <Route
              path="/users/:id"
              element={<UserView user={selectedUser} />}
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate replace to="/" />
                ) : (
                  <LoginForm handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogView
                  blog={selectedBlog}
                  loggedInUser={user}
                  handleLike={likeBlog}
                  handleDelete={deleteBlog}
                  handleComment={addComment}
                />
              }
            />
            <Route
              path="/create"
              element={
                user ? (
                  <BlogForm createBlog={addBlog} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Container>
  )
}

export default App

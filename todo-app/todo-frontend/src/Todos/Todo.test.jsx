// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Todo from './Todo'

afterEach(cleanup)

describe('Todo component', () => {
  it('shows an incomplete todo and handles button clicks', () => {
    const todo = { _id: '1', text: 'Learn Docker', done: false }
    const deleteTodo = vi.fn()
    const completeTodo = vi.fn()

    render(
      <Todo
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    )

    expect(screen.getByText('Learn Docker')).toBeTruthy()
    expect(screen.getByText('This todo is not done')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Set as done' }))
    expect(completeTodo).toHaveBeenCalledWith(todo)

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  it('shows a completed todo without the complete button', () => {
    const todo = { _id: '2', text: 'Write code', done: true }

    render(
      <Todo
        todo={todo}
        deleteTodo={vi.fn()}
        completeTodo={vi.fn()}
      />
    )

    expect(screen.getByText('Write code')).toBeTruthy()
    expect(screen.getByText('This todo is done')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Set as done' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy()
  })
})

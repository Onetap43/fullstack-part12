import { Fragment } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Fragment key={todo._id}>
          {index > 0 && <hr />}
          <Todo
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        </Fragment>
      ))}
    </>
  )
}

export default TodoList

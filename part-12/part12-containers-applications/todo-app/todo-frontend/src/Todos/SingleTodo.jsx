import React from 'react'

// eslint-disable-next-line react/prop-types
const SingleTodo = ({todo, doneInfo, notDoneInfo}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
    <span>
      {todo.text}
    </span>
    {todo.done ? doneInfo : notDoneInfo}
  </div>
  )
}

export default SingleTodo
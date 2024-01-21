export default function Todo({ todo, deleteTodo, completeTodo }) {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )
  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )
  return (
    <div data-testid="custom-element" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>
        {todo.text}
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
}
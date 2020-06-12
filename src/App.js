import React, {Fragment, useReducer, useState} from "react"

const reducer = (state, action) =>{
  switch(action.type){
    case "add-todo":
      return {
        todos:[...state.todos, {text: action.text, completed: false}],
        todoCount: state.todoCount + 1
      }

      case "complete-todo":
        return {
          todos: state.todos.map((todo, idx) => (
            action.idx === idx? {...todo, completed: !todo.completed}: todo
          )),
          todoCount: state.todos.reduce((todoCount, currentTodo, idx) => {
            if(action.idx === idx){
             todoCount = currentTodo.completed? todoCount + 1 :  todoCount - 1
            }
            return todoCount;
          },state.todoCount),
        }

      default:
        return {
          todos: state.todos,
          todoCount: state.todoCount
        }
  }

}



const App =() => {

  const [text, setText] = useState("")
  const [{todoCount, todos}, dispatch] = useReducer(reducer, {
    todos:[],
    todoCount:0
  })

  return(
    <Fragment>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch({type: "add-todo", text: text})
        setText("")
      }}>
       <input type="text" value={text} onChange={e => setText(e.target.value)} />
      </form>
    <p># Of Items to be Completed: {todoCount}</p>
      <ol>
        {todos.map((todo, idx) =>(
          <li 
          key={idx}
          onClick={() => dispatch({type:"complete-todo", idx})}
          style={{
            textDecoration: todo.completed? "line-through":"none",
            cursor: "pointer"
          }}
          >
            {todo.text}
          </li>
        ))}
      </ol>

    </Fragment>
  )
}


export default App;
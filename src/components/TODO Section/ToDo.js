import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Flex } from "../Styles/Flexbox";

const ToDo = () => {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggle = () => {
    setShowInput(!showInput);
  };

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo('');
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput('');
    }
  }, [setInput, editTodo]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed)
    }
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if(item.id === todo.id) {
          return {...item, completed: !item.completed}
        }
        return item;
      })
    )
  };
  const handleEdit = ({id}) => {
    setShowInput(true);
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };
  const handleDelete = ({id}) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  return (
    <StyledToDo>
      <h4>
        <Flex spaceBetween>ToDo List 

        <button className={editTodo ? 'disabled' : ''} onClick={handleToggle}>
          {showInput ? "Cancel" : "Add a task"}
          </button>
        </Flex>
      </h4>

      <div className="placeholder">
        <p>Get more done</p>
        <h3>
          Add your tasks. <br />
          Organize your life.
          <br />
          Achieve more every day.
        </h3>
        <p>
          Add tasks like “Read work emails every day at 10am” to fill your to-do
          list in seconds.
        </p>
      </div>

      <div className="todoItems">
        <form className={showInput ? null : "hidden"} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Take a note..."
            value={input}
            required
            onChange={handleChange}
          />
        </form>

        <div className="eachItem">
          {todos.map((todo) => {
            return (
              <Flex className={`${todo.completed ? 'completed' : ''}`} spaceBetween key={todo.id}>
                {todo.title}  
                <div>
                  <button className="hidden" onClick={() => handleComplete(todo)}>Done</button>
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo)}>Delete</button>
                </div>
              </Flex>
            );
          })}
        </div>
      </div>
    </StyledToDo>
  );
};

export default ToDo;

const StyledToDo = styled.div`
  padding-inline: 1.5rem;
  background-color: ${({ theme }) => theme.light};
  border-radius: 8px;
  min-height: 80vh;
  & > h4 {
    padding-block: 1rem;
    color: ${({ theme }) => theme.accent3};
    border-bottom: 1px solid ${({ theme }) => theme.background};
    & button {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      padding-inline: 1rem;
      border-radius: 6px;
      cursor: pointer;
      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
  & .placeholder {
    padding-block: 1rem 1.2rem;
    border-bottom: 1px solid #eee;
    & h3 {
      line-height: 1.2;
      margin-bottom: 1rem;
    }
  }
  & .todoItems {
    padding-block: 1.2rem;
    & input {
      border: 1px solid #ddd;
      padding: 15px 10px;
      display: block;
      width: 100%;
      border-radius: 6px;
      min-height: 48px;
    }
    & form.hidden {
      visibility: hidden;
      opacity: 0;
      height: 0;
    }
    & .eachItem > div {
      background: transparent;
      margin-block: 0.5rem;
      padding: 12px 10px;
      border-radius: 6px;
      border: 1px solid #ddd;
      & button.hidden {
        display: none;
      }
    }
  }
`;

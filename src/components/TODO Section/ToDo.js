import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiCircle, BiDotsVerticalRounded } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { Flex } from "../Styles/Flexbox";

const ToDo = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const focusRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleToggle = () => {
    setShowInput(!showInput);
    if (!showInput) {
      focusRef.current.focus();
    }
  };

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };
  const handleEdit = ({ id }) => {
    setShowInput(true);
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };
  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAction = ({ id }) => {
    setDropdown((prev) => {
      return prev === id ? null : id;
  });
  }

  return (
    <StyledToDo>
      <h4>
        <Flex spaceBetween>
          ToDo List
          <button className={editTodo ? "disabled" : ""} onClick={handleToggle}>
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
            ref={focusRef}
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
              <Flex
                spaceBetween
                gap="10px"
                key={todo.id}
              >
                <button className={`taskText ${todo.completed ? "completed" : ""}`} onClick={() => handleComplete(todo)} title="Done">
                  <BiCircle />
                  <span>{todo.title}</span>
                </button>
                <button onClick={() => handleAction(todo)}>
                  <BiDotsVerticalRounded  title="More" />
                  <div className={`moreAction ${dropdown === todo.id ? 'active' : ''}`}>
                    <span onClick={() => handleEdit(todo)}>Make changes</span>
                    <span onClick={() => handleDelete(todo)}>Delete this task</span>
                  </div>
                </button>
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
  min-width: 350px;
  flex: 1;
  & > h4 {
    padding-block: 1rem;
    color: ${({ theme }) => theme.accent3};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    & button {
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.border};
      color: ${({ theme }) => theme.textLight};
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
    border-bottom: 1px solid ${({ theme }) => theme.border};
    & h3 {
      line-height: 1.2;
      margin-bottom: 1rem;
    }
  }
  & .todoItems {
    padding-block: 1.2rem;
    & input {
      border: 1px solid ${({ theme }) => theme.border};
      padding: 15px 10px;
      display: block;
      width: 100%;
      border-radius: 6px;
      min-height: 48px;
      background: transparent;
      color: ${({ theme }) => theme.text};
    }
    & form.hidden {
      opacity: 0;
      height: 0;
    }
    & .eachItem > div {
      background: transparent;
      margin-block: 0.5rem;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.border};
      & > button {
        position: relative;
        background: transparent;
        border: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 10px;
        text-align: left;
        color: ${({ theme }) => theme.text};
        & svg {
          min-width: 20px;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          transition: transform 0.3s ease-in-out;
        }
        &.completed svg {
          background: ${({ theme }) => theme.text};
          transform: scale(0.8);
        }
        &.taskText {
          flex: 1;
        }
        &.completed span {
          text-decoration: line-through;
          color: ${({ theme }) => theme.textLight};
        }
      }
      & .moreAction {
        display: none;
        position: absolute;
        top: 90%;
        background: ${({ theme }) => theme.light};
        border: 1px solid ${({ theme }) => theme.border};
        right: -10px;
        border-radius: 4px;
        z-index: 2;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 2px 6px 2px rgba(60,64,67,0.149);
        width: max-content;
        &.active {
          display: block;
        }
        & span {
          display: block;
          padding: 8px 16px;
          font-size: 14px;
          line-height: 1.8;
          letter-spacing: 0.02em;
          border-bottom: 1px solid ${({ theme }) => theme.border};
          &:last-child {
            border: 0;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    min-width: 100%;
    min-height: auto;
  }
  @media (max-width: 540px) {
    padding-inline: 1rem;
  }
`;

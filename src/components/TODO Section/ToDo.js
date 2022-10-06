import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { Flex } from "../Styles/Flexbox";

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

const ToDo = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [isEditItem, setIsEditItem] = useState(null);

  const handleToggle = () => {
    setShowInput(!showInput);
  };

  const addItem = (event) => {
    event.preventDefault();
    if (!inputData) {
    } else if (inputData && isEditItem) {
      setItems(
        items.map((item) => {
          if (item.id === isEditItem) {
            return { ...items, name: inputData}
          }
          return item;
        })
      )
      setShowInput(false);
      setInputData('');
      setIsEditItem(null);
    } else {
      const allInputData = { id: uuidv4(), name: inputData};
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((item) => {
      return index !== item.id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((item) => {
      return item.id === id;
    });
    setShowInput(true);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items])

  return (
    <StyledToDo>
      <h4>
        <Flex spaceBetween>
          ToDo List{" "}
          <button onClick={handleToggle}>
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
        <form className={showInput ? null : "hidden"} onSubmit={addItem}>
          <input
            type="text"
            placeholder="Take a note..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </form>
        <div className="eachItem">
          {items.map((item) => {
            return (
              <Flex spaceBetween key={item.id}>
                {item.name}
                <div>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
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
      background: #ccff90;
      margin-block: 0.5rem;
      padding: 12px 10px;
      border-radius: 6px;
    }
  }
`;

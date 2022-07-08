import React, { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import UseRandom from "./get_quotes";
import { getValue } from "@testing-library/user-event/dist/utils";

// get local storage

const getLocalItems = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function Todos(props) {
  const [todos, setTodos] = useState(getLocalItems());
  const [input, setInput] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  // check box...................
  // const [checked, setChecked] = useState(false);
  // const [isDone, setIsDone] = useState(false);
  // const label = { inputProps: { "aria-label": "mark as done" } };

  // function markDone(id) {
  //   console.log(id);
  //   setIsDone((prevItems) => {
  //     return !prevItems;
  //   });
  // }

  // const toggleCheckbox = (e) => {
  //   setChecked(e.target.checked);
  // };

  // checbox end .......................

  // add item to list
  const addTodo = (e) => {
    e.preventDefault();
    if (!input) {
      alert("Please fill the data!");
    } else if (input && !toggleSubmit) {
      setTodos(
        todos.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: input.toUpperCase() };
          }
          return elem;
        })
      );

      setToggleSubmit(true);

      setInput("");

      setIsEdit(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: input.toUpperCase(),
      };
      setTodos([...todos, allInputData]);
      // console.log(.toUpperCase());
      setInput("");
    }
  };

  // local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todos));
  }, [todos]);

  function deleteItems(index) {
    console.log("deleted");
    setTodos((prevItems) => {
      return prevItems.filter((elem) => {
        return index !== elem.id;
      });
    });
  }
  function editItems(id) {
    console.log("edit");
    let newEditItem = todos.find((elem) => {
      return elem.id === id;
    });
    console.log(id, newEditItem);
    //console.log(id, name);

    setToggleSubmit(false);
    setInput(newEditItem.name);
    setIsEdit(id);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome to my TODO List </h1>
        <h2>
          {" "}
          <em>
            <UseRandom />
          </em>
        </h2>

        <form>
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          {toggleSubmit ? (
            <button id="btn" onClick={addTodo}>
              Add todo
            </button>
          ) : (
            <button id="btn" onClick={addTodo}>
              Update todo
            </button>
          )}
        </form>

        <h2>List of Todos</h2>
        <div className="box">
          <ul className="list">
            {todos.map((elem) => {
              return (
                <div className="box" key={elem.id}>
                  <li>
                    <h3>{elem.name}</h3>
                  </li>
                  <div className="buttons">
                    <i id="btn2">
                      <DeleteIcon onClick={() => deleteItems(elem.id)} />
                    </i>
                    <i id="edit">
                      <EditIcon onClick={() => editItems(elem.id)} />
                    </i>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Todos;

// eslint.config.js
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Home({ allNotes, setAllNotes }) {
  const [title, setTitle] = useState("");
  const [editTitleId, setEditTitleId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let retrievedArrayString = localStorage.getItem("allNotes");
    let localAllNotes = retrievedArrayString
      ? JSON.parse(retrievedArrayString)
      : [];

    if (localAllNotes.length > 0) {
      setAllNotes(localAllNotes);
    }
  }, []);

  const addTodo = () => {
    let newItem = {
      id: uuidv4(),
      title: title,
      contant: [],
    };

    setAllNotes([newItem, ...allNotes]);

    let myArrayString = JSON.stringify([newItem, ...allNotes]);
    localStorage.setItem("allNotes", myArrayString);

    setTitle("");
  };

  const deleteTodo = (id) => {
    const newData = allNotes.filter((item) => item.id !== id);

    setAllNotes(newData);

    localStorage.setItem("allNotes", JSON.stringify(newData));
  };

  const editTodo = (id, name) => {
    setEditTitleId(id);
    setEditTitle(name);
  };

  const updateTitle = () => {
    // id and title need to set in state
    // find item with similar id in array
    // update the item's title and keep other data as it is
    //replace the title and return array
    // restating all the state

    let findItem = allNotes.find((item) => item.id === editTitleId);

    let updateItem = { ...findItem, title: editTitle };

    let newArray = allNotes.map((item) => {
      if (item.id === editTitleId) {
        return updateItem;
      }

      return item;
    });

    setAllNotes(newArray);
    setEditTitleId("");
    setEditTitle("");
    localStorage.setItem("allNotes", JSON.stringify(newArray));
  };

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  const findTitle = () => {
    let findData = allNotes.filter((item) => item.title.includes(searchValue));
    setSearchResult(findData);
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  return (
    <main>
      {/* search input with search button */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid black",
          marginTop: 10,
        }}
      >
        <div>
          <input
            style={{
              height: 50,
              width: 600,
              fontSize: 18,

              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            }}
            value={searchValue}
            placeholder="       search "
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                findTitle();
              }
            }}
          />
        </div>
        <div>
          <button
            style={{
              height: 55,
              width: 120,
              fontSize: 18,
              border: "none",
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
            }}
            onClick={() => findTitle()}
          >
            search
          </button>
        </div>
      </section>

      {/* search results mapping */}
      {searchResult.map((item) => (
        <p onClick={() => handleClick(item.id)} key={item.id}>
          {item.title}
        </p>
      ))}

      {searchResult.length === 0 && (
        <section>
          {/* add todo input with add button */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
            />
            <button onClick={addTodo}>add Title</button>
          </div>

          {/* allNotes mapping with edit and delete functionality */}
          {allNotes.map((note) => {
            return (
              <div style={{ display: "flex" }} key={note.id}>
                {note.id === editTitleId ? (
                  <input
                    type="text"
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        updateTitle();
                      }
                    }}
                    value={editTitle}
                    onChange={handleEditTitleChange}
                  />
                ) : (
                  <p onClick={() => handleClick(note.id)}>{note.title}</p>
                )}
                <button onClick={() => deleteTodo(note.id)}>delete</button>
                <button onClick={() => editTodo(note.id, note.title)}>
                  Edit Title
                </button>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Home;

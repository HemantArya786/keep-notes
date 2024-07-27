// eslint.config.js
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Home({ allNotes, setAllNotes }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [editTitleId, setEditTitleId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [content, setContent] = useState([""]);
  const [editContent, setEditContent] = useState([""]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  console.log(allNotes);

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
    setShowInput(!showInput);
    let newItem = {
      id: uuidv4(),
      title: title,
      contant: [content],
      Createdate: new Date(),
      lastUpdate: updateDate,
    };

    setAllNotes([newItem, ...allNotes]);

    let myArrayString = JSON.stringify([newItem, ...allNotes]);
    localStorage.setItem("allNotes", myArrayString);

    setTitle("");
    setContent("");
  };

  const deleteTodo = (id) => {
    const newData = allNotes.filter((item) => item.id !== id);

    setAllNotes(newData);

    localStorage.setItem("allNotes", JSON.stringify(newData));
  };

  const editTodo = (id, name, content) => {
    setEditTitleId(id);
    setEditTitle(name);
    setEditContent([content]);
    setUpdateDate(new Date());
  };

  const updateTitle = () => {
    // id and title need to set in state
    // find item with similar id in array
    // update the item's title and keep other data as it is
    //replace the title and return array
    // restating all the state

    let findItem = allNotes.find((item) => item.id === editTitleId);

    let updateItem = {
      ...findItem,
      title: editTitle,
      contant: [editContent],
      lastUpdate: updateDate,
    };

    console.log(updateItem, "updated item ");

    let newArray = allNotes.map((item) => {
      if (item.id === editTitleId) {
        return updateItem;
      }

      return item;
    });

    setAllNotes(newArray);
    setEditTitleId("");
    setEditTitle("");
    setEditContent("");
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

  const handleEditContentChange = (e) => {
    setEditContent(e.target.value);
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
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderBottom: "2px solid black",
            marginTop: 10,
          }}
        >
          {/* add todo input with add button */}
          <div
            style={{
              display: "flex",

              border: "2px solid black",
            }}
          >
            {showInput && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  style={{ width: 515, height: 40, fontSize: 18 }}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      addTodo();
                    }
                  }}
                />
                <textarea
                  style={{ width: 500, height: 100, fontSize: 15, padding: 10 }}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      addTodo();
                    }
                  }}
                />
              </div>
            )}

            <button
              style={{
                height: 55,
                width: 600,
                borderRadius: 20,
                fontSize: 18,
                border: "none",
              }}
              onClick={addTodo}
            >
              <p>Take a Note </p>
              {showInput ? "Hide Input" : "Show Input"}
            </button>
          </div>

          {/* allNotes mapping with edit and delete functionality */}
          {allNotes.map((note) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: 600,
                  height: 400,

                  border: "2px solid green",
                }}
                key={note.id}
              >
                {note.id === editTitleId ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
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
                    <input
                      type="text"
                      value={editContent}
                      onChange={handleEditContentChange}
                      style={{ width: "500px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          updateTitle();
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ border: "2px solid black", width: 600 }}>
                    <p
                      style={{
                        width: 600,
                        height: 50,
                        border: "2px solid red",
                      }}
                      onClick={() => handleClick(note.id)}
                    >
                      {note.title}
                    </p>
                    <p
                      style={{
                        height: 200,
                        width: 600,
                        border: "2px solid red",
                        fontSize: 18,
                      }}
                    >
                      {note.contant}
                    </p>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    border: "2px solid black",
                    width: "full",
                  }}
                >
                  <button
                    style={{ width: 100 }}
                    onClick={() => deleteTodo(note.id)}
                  >
                    delete
                  </button>
                  <button
                    style={{ width: 100 }}
                    onClick={() => editTodo(note.id, note.title, note.content)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Home;

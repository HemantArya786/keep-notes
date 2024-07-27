import { useState } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d2d4d6",
    borderRadius: 10,
  },
};
function Home() {
  const [allNotes, setAllNotes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notesEditId, setNotesEditId] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  console.log(allNotes);

  const addvalue = () => {
    let newNotes = {
      id: uuidv4(),
      title: currentTitle,
      content: currentContent,
      createDate: new Date(),
    };

    setCurrentContent("");
    setCurrentTitle("");

    setAllNotes([newNotes, ...allNotes]);
    localStorage.setItem("data", JSON.stringify(allNotes));
    setShowAddModal(false);
  };

  const createNote = () => {
    setShowAddModal(true);
  };

  const deleteNote = (id) => {
    let afterDeleteNotesList = allNotes.filter((item) => item.id !== id);

    setAllNotes(afterDeleteNotesList);

    console.log(afterDeleteNotesList);
  };

  const editRequested = (id) => {
    let foundedNotes = allNotes.find((item) => item.id === id);
    console.log(foundedNotes, "update");
    setCurrentContent(foundedNotes.content);
    setCurrentTitle(foundedNotes.title);
    setNotesEditId(foundedNotes.id);
    setShowAddModal(true);
    setIsEdited(true);
  };

  const editNote = () => {
    let updateNote = {
      title: currentTitle,
      content: currentContent,
      modifiedDate: new Date(),
      id: notesEditId,
    };

    let modifiedNote = allNotes.map((item) => {
      if (item.id === notesEditId) {
        item = updateNote;
      }
      return item;
    });

    setAllNotes(modifiedNote);
    setIsEdited("");
    setCurrentTitle("");
    setCurrentContent("");
    setShowAddModal(false);
  };

  return (
    <main style={{ fontFamily: "poppins" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid grey",
        }}
      >
        <div style={{ width: "20%" }}>
          <h1>Keeps Notes</h1>
        </div>
        <div style={{ width: "80%" }}>
          <input
            style={{
              width: 800,
              height: 40,
              fontSize: 28,
              borderRadius: 10,
              border: "none",
              color: "black",
              backgroundColor: "#d2d4d6",
            }}
            placeholder="   search"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <button
          style={{
            padding: 20,
            border: "none",
            fontSize: 18,
            width: 500,
            borderRadius: 10,
            backgroundColor: "#d2d4d6",
          }}
          onClick={() => createNote()}
        >
          Take a Note....
        </button>
      </div>
      <section style={{}}>
        <Modal
          isOpen={showAddModal}
          onRequestClose={() => setShowAddModal(false)}
          style={customStyles}
        >
          <div
            style={{
              width: "600px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              style={{
                height: 30,
                fontSize: 18,
                border: "none",
                padding: 10,
                backgroundColor: "transparent",
              }}
              placeholder="Title"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
            <textarea
              style={{
                height: 60,
                fontSize: 18,
                border: "none",
                padding: 10,
                backgroundColor: "transparent",
              }}
              placeholder="Take a note...."
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
            />
          </div>
          <div>
            <button
              style={{
                width: 150,
                height: 40,
                fontSize: 18,
                borderRadius: 10,
                border: "none",
              }}
              onClick={() => {
                isEdited ? editNote() : addvalue();
              }}
            >
              {isEdited ? "Edit" : "Add"}
            </button>
          </div>
        </Modal>
      </section>
      <section>
        {allNotes.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              borderRadius: 10,

              margin: 20,
              width: 200,
              height: "auto",
              padding: 20,
            }}
          >
            <div style={{ borderBottom: "1px solid black" }}>
              <p style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</p>
            </div>
            <div>
              <p style={{ fontSize: 15, wordWrap: "break-word" }}>
                {item.content}
              </p>
            </div>
            <div>
              <button onClick={() => deleteNote(item.id)}>delete</button>
            </div>
            <div>
              <button onClick={() => editRequested(item.id)}>Edit</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;

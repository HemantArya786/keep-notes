import { useEffect, useState } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

const customStyles = {
  content: {
    top: "36%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#e5e7eb",
    borderRadius: "0.625rem",
    width: "80%",
    maxWidth: "600px",
  },
};

function Home() {
  const [allNotes, setAllNotes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notesEditId, setNotesEditId] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [foundedDataList, setFoundDataList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    const retrievedArrayString = localStorage.getItem("data");
    const localAllNotes = retrievedArrayString
      ? JSON.parse(retrievedArrayString)
      : [];

    if (localAllNotes.length > 0) {
      setAllNotes(localAllNotes);
    }
  }, []);

  const addValue = () => {
    if (currentTitle === "") {
      alert("Don't let the title empty");

      return;
    }

    const newNotes = {
      id: uuidv4(),
      title: currentTitle,
      content: currentContent,
      createDate: new Date(),
    };

    const updatedNotes = [newNotes, ...allNotes];

    setCurrentContent("");
    setCurrentTitle("");
    setAllNotes(updatedNotes);

    localStorage.setItem("data", JSON.stringify(updatedNotes));
    setShowAddModal(false);
  };

  const createNote = () => {
    setShowAddModal(true);
  };

  const deleteNote = (id) => {
    const afterDeleteNotesList = allNotes.filter((item) => item.id !== id);
    setAllNotes(afterDeleteNotesList);
    localStorage.setItem("data", JSON.stringify(afterDeleteNotesList));
  };

  const editRequested = (id) => {
    const foundedNotes = allNotes.find((item) => item.id === id);
    setCurrentContent(foundedNotes.content);
    setCurrentTitle(foundedNotes.title);
    setNotesEditId(foundedNotes.id);
    setShowAddModal(true);
    setIsEdited(true);
  };

  const editNote = () => {
    if (currentTitle === "") {
      alert("Don't let the title empty");

      return;
    }
    const updateNote = {
      title: currentTitle,
      content: currentContent,
      modifiedDate: new Date(),
      id: notesEditId,
    };

    const modifiedNotes = allNotes.map((item) =>
      item.id === notesEditId ? updateNote : item
    );

    setAllNotes(modifiedNotes);

    setIsEdited(false);
    setCurrentTitle("");
    setCurrentContent("");
    setShowAddModal(false);

    localStorage.setItem("data", JSON.stringify(modifiedNotes));
  };

  const closeModal = () => {
    setShowAddModal(false);
    setCurrentTitle("");
    setCurrentContent("");
    setIsEdited(false);
    setNotesEditId("");
  };

  const openNote = (item) => {
    setCurrentContent(item.content);
    setCurrentTitle(item.title);
    setNotesEditId(item.id);
    setShowAddModal(true);
    setIsEdited(true);
  };

  const findingValue = () => {
    const foundValue = allNotes.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.content.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFoundDataList(foundValue);
  };

  useEffect(() => {
    findingValue();
  }, [searchValue]);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;

  const currentNotes = (searchValue ? foundedDataList : allNotes).slice(
    indexOfFirstNote,
    indexOfLastNote
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log([...Array(Math.ceil(allNotes.length / notesPerPage)).keys()]);

  return (
    <main className="font-poppins p-4">
      <div className="flex flex-col md:flex-row items-center border-b border-gray-500 my-5 pb-5">
        <div className="w-full md:w-1/4 text-center md:text-left">
          <p className="text-2xl font-bold">Keep Notes</p>
        </div>
        <div className="w-full md:w-3/4 mt-4 md:mt-0 text-center">
          <input
            className="w-full md:w-3/4 h-12 text-lg pl-4 rounded bg-gray-100 text-black cursor-pointer"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          className="p-5 text-lg w-3/4 md:w-1/2 rounded bg-gray-200"
          onClick={createNote}
        >
          Take a Note....
        </button>
      </div>

      <section>
        <Modal
          isOpen={showAddModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="w-full flex flex-col">
            <input
              className="h-10 text-lg border-none p-5 bg-transparent"
              placeholder="Title"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
            <textarea
              className="h-20 text-lg border-none p-5 mb-4 bg-transparent"
              placeholder="Take a note...."
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
            />
          </div>
          <div className="flex justify-center ">
            <button
              className="w-full h-10 text-lg rounded border border-black bg-transparent"
              onClick={isEdited ? editNote : addValue}
            >
              {isEdited ? "Edit" : "Add"}
            </button>
          </div>
        </Modal>
      </section>
      <section className="flex flex-wrap justify-center">
        {currentNotes.map((item) => (
          <div
            key={item.id}
            className="border border-black rounded m-4 w-full md:w-1/4 p-5 cursor-pointer"
            onClick={() => openNote(item)}
          >
            <div className="border-b border-black mb-4">
              <p className="text-lg font-bold">{item.title}</p>
            </div>

            <div>
              <p className="text-sm break-words">{item.content}</p>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                className="flex items-center justify-center w-1/2 h-10 text-lg rounded bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(item.id);
                }}
              >
                <AiOutlineDelete />
              </button>
              <button
                className="flex items-center justify-center w-1/2 h-10 text-lg rounded bg-gray-200"
                onClick={() => {
                  editRequested(item.id);
                }}
              >
                <MdOutlineEdit />
              </button>
            </div>
            <div className="pt-5 flex flex-col items-end ">
              <p className="text-sm font-light">
                Edited : {dayjs(item.Createdate).format("MMM D, YY ")}
              </p>
              <p className="text-xs font-extralight">
                {dayjs(item.Createdate).format("H:m a")}
              </p>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(allNotes.length / notesPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number + 1
                  ? "bg-gray-300 text-black"
                  : "bg-gray-100"
              }`}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </main>
  );
}

export default Home;

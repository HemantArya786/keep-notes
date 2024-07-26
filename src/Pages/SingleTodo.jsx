import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SingleTodo({ allNotes, setAllNotes }) {
  let { todoId } = useParams();
  const [addContent, setAddContent] = useState("");
  let retrievedArrayString = localStorage.getItem("allNotes");

  let searchallNotes = JSON.parse(retrievedArrayString);

  let data = searchallNotes.find((item) => item.id === todoId);

  //   console.log(data);

  //   searchallNotes.filter(())

  //   filter out the note from all notes using id

  // map content from that note filtered

  return (
    <div>
      <p>{data.title}</p>
      {data?.content?.map((item) => (
        <div key={useParams}>
          <p>{item.data}</p>
          <input onChange={(e) => setAddContent(e.target.value)} />
        </div>
      ))}
    </div>
  );
}

export default SingleTodo;

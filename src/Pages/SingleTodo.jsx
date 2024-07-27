import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SingleTodo({ allNotes, setAllNotes }) {
  let { todoId } = useParams();
  // const [addContent, setAddContent] = useState("");
  let retrievedArrayString = localStorage.getItem("allNotes");

  let searchallNotes = JSON.parse(retrievedArrayString);

  let data = searchallNotes.find((item) => item.id === todoId);

  console.log(data);

  // console.log(data, "yeh data dekho");
  //   console.log(data);

  //   searchallNotes.filter(())

  //   filter out the note from all notes using id

  // map content from that note filtered

  return (
    <div style={{ border: "2px solid black" }}>
      <p>created Date : {data.Createdate}</p>
      <p>{data.title}</p>
      {data?.contant?.map((item, idx) => (
        <div key={idx}>
          <p>{item}</p>
        </div>
      ))}
      <p>last Modification date : {data.lastUpdate}</p>
    </div>
  );
}

export default SingleTodo;

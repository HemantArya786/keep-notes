import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
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
    <div
      style={{
        display: "flex",
        fontFamily: "poppins",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "grey",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: "800px",
          display: "flex",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <p style={{ fontSize: 18 }}>
          created Date : {dayjs(data.Createdate).format("DD/MM/YYYY h:mm A")}
        </p>
      </div>
      <div
        style={{
          width: "800px",
          padding: "20px",
          backgroundColor: "#c9c6c5",
        }}
      >
        <div>
          <p style={{ fontSize: 28 }}>{data.title}</p>
        </div>
        {data?.contant?.map((item, idx) => (
          <div key={idx} style={{ height: "300px" }}>
            <p style={{ fontSize: 18 }}>{item}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "grey",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          width: "800px",
          display: "flex",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <p style={{ fontSize: 18 }}>
          last Modification date :{" "}
          {dayjs(data.lastUpdate).format("DD/MM/YYYY h:mm A")}
        </p>
      </div>
    </div>
  );
}

export default SingleTodo;

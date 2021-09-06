import React, { useEffect, useState } from "react";

function Modal(props) {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(props.text);
  }, [props]);
  if (!props.show) {
    return null;
  }
  const style = {
    modal: {
      bg: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(204 204 204 / 84%)",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
      },
      box: {
        width: "auto",
        height: "auto",
        position: "static",
        overflow: "hidden",
        padding: 5,
        margin: 20,
        backgroundColor: "#FFF"
      }
    }
  };
  const onSubmitTitle = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: value })
    };
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${props.postId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(props);
        props.newData(data);
        props.onClose();
      });
  };
  return (
    <div className="modal">
      <div style={style.modal.bg}>
        <div style={style.modal.box}>
          <p>Edit Title</p>
          <input
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            type="text"
            id="EditTitle"
            value={value}
          />
          <br />
          <button onClick={() => onSubmitTitle()}>Edit</button>
          <button onClick={props.onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

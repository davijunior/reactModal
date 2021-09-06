import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

const App = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [posts, setPosts] = useState([]);
  const style = {
    li: {
      backgroundColor: "#666555",
      listStyleType: "none",
      textAlign: "center",
      fontWeight: "bold",
      padding: 0,
      border: "1px solid #000",
      button: {
        float: "right",
        padding: 5,
        marginRight: 10
      }
    }
  };
  const prepareModal = (modal_name, modal_id) => {
    setName(modal_name);
    setId(modal_id);
    setShow(true);
  };
  const showItem = (item) => (
    <li style={style.li}>
      <p>
        {item[1].id} - {item[1].userId}{" "}
        <button
          style={style.li.button}
          onClick={() => prepareModal(item[1].title, item[1].id)}
        >
          Edit
        </button>
      </p>
      <p>{item[1].title}</p>
    </li>
  );
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  const UpdateList = (newData) => {
    posts[newData.id - 1].title = newData.title;
    setPosts(posts);
  };
  return (
    <div>
      <Modal
        postId={id}
        onClose={() => setShow(false)}
        show={show}
        text={name}
        newData={(e) => UpdateList(e)}
      />
      <ul>
        {Object.entries(posts)
          .slice(0, 10)
          .map((post) => showItem(post))}
      </ul>
    </div>
  );
};

export default App;

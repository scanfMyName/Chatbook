import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { addPost, getPosts } from "../actions/postActions";
// import
import List from "./List";
import Alert from "./Alert";
import axios from "axios";
import "./Dashboard.css";
import isEmpty from "../validation/is-empty";
// import { set } from "mongoose";
// import hcbgImage from "./login-page.png";
function Dashboard(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);
  const [stateChanged, setStateChanged] = useState(false);
  const { posts, loading } = props.post;
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");
  const [list, setList] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  console.log("Inside the Dashboard, The props are", props);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      showAlert(true, "danger", "There is nothing to be post");
    }

    // else if (name && isEditing && userName) {
    //   setList(
    //     list.map((item) => {
    //       if (item.id === editID) {
    //         return { ...item, title: name, vlue: userName };
    //       }
    //       return item;
    //     })
    //   );
    //   setName('');
    //   setUserName('');
    //   setEditID(null);
    //   setIsEditing(false);
    //   showAlert(true, 'success', 'Post Edited');
    // }
    else {
      showAlert(true, "processing", "Request for post to be saved is sent");
      // const newItem = { id: new Date().getTime().toString(), title: name, vlue: userName };
      const { user } = auth;

      const newPost = {
        text: text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      };
      axios
        .post("/api/posts", newPost)
        .then((res) => {
          console.log("The response is", res);
          showAlert(true, "success", "Post is saved");
          dispatch(addPost(newPost));
          setText("");
        })
        .catch((err) => {
          console.log("The error is", err);
        });

      // props.addPost(newPost)
      setList([...list, newPost]);
      // setText('');
      // setUserName('');
    }
  };

  // if(posts === null || loading){
  //   setList(null);
  // }
  // else{
  //   setList(posts);
  // }

  useEffect(async () => {
    axios
      .get("/api/posts/allPost")
      .then((res) => {
        console.log("The response is", res);
        setList(res.data);
      })
      .catch((err) => {
        console.log("The error is", err);
        setList(null);
      });
  }, [stateChanged]);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "processing", "Post removed request is send");
    const req_body = {
      user_id: auth.user._id,
      post_id: id,
    };
    axios
      .delete(`/api/posts`, { data: req_body })
      .then((res) => {
        console.log("The response for deletion is", res);
        showAlert(true, "danger", "Post removed");
        setStateChanged(!stateChanged);
        // setList(list.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log("The error is", err);
      });
  };
  const editItem = (id) => {
    console.log("List:", list);
    const specificItem = list.find((item) => item._id === id);

    console.log("The specific item is", specificItem, " for id:", id);
    if(specificItem === undefined){
      showAlert(true, "danger", "The post you requested to delete, does not exist");
      return;
    }
    if (specificItem !== undefined) {
      setIsEditing(true);
      setEditID(id);
      setText(specificItem.text);
      setUserName(specificItem.name);
    } else if (specificItem.user !== auth.user.id) {
      showAlert(true, "danger", "You are not authorised to edit this post");
      return;
    }
  };

  return (
    <section className="section-center">
      <form className="post-form bgimage" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Write your post here</h3>
        <div className="post-control">
          {/* <h4>User name:</h4><input
            type='text'
            className='userName'
            placeholder='Your Name:'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
         < br /> */}

          <h4>Your new post</h4>
          <input
            type="text"
            className="post"
            placeholder="Write what is on your mind today. :"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="post-container">
          <h2>Now, here you will see the post uploaded till now:-</h2>
          <List items={list} removeItem={removeItem} editItem={editItem} />
        </div>
      )}
    </section>
  );
}
Dashboard.propTypes = {
  // errors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
});
export default connect(mapStateToProps, { addPost, getPosts })(Dashboard);

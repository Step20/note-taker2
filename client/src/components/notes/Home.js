import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsTrash3 } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import EditNote from "./EditNote";
export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = React.useState(false);

  function click(e) {
    e.preventDefault();
    setVisible(true);
  }

  const toggle = () => setModal(!modal);

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });
        setModal(!modal);
        return navigate.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="note-out">
        <Container fluid className="note-group">
          <Row className="card-group">
            <Col className="mt-5" sm="4">
              <div className="card black text-center my-auto" onClick={toggle}>
                <div className="content">
                  <BsFillPlusCircleFill className="iconc  mx-auto text-center" />
                  <h4>Create Note</h4>
                </div>
              </div>
            </Col>

            {notes.map((note) => (
              <Col className="mt-5" sm="4">
                <div className="card" key={note._id}>
                  <div className="content">
                    <h4 title={note.title}>{note.title}</h4>
                    <div className="text">
                      <p>{note.content}</p>
                    </div>
                    <p className="date">{format(note.date)}</p>
                    <div className="card-low">
                      <Link to={`edit/${note._id}`}>
                        <GoPencil className="icon mx-4" />
                      </Link>

                      {/* <GoPencil
                        className="icon mx-4"
                        onClick={(event) => {
                          click(event);
                        }}
                      />

                      {visible && <EditNote i={note._id} />} */}

                      <BsTrash3
                        className="icon"
                        onClick={() => deleteNote(note._id)}
                      />
                    </div>
                  </div>
                </div>{" "}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} toggle={toggle} modalClassName="modal">
        <ModalHeader toggle={toggle}>Create Note</ModalHeader>
        <ModalBody>
          <form onSubmit={createNote} autoComplete="off">
            <div className="row ">
              <label htmlFor="title">Title</label>
              <input
                className="input mx-auto"
                type="text"
                value={note.title}
                id="title"
                name="title"
                required
                onChange={onChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="content">Content</label>
              <textarea
                className="input mx-auto"
                type="text"
                value={note.content}
                id="content"
                name="content"
                required
                rows="10"
                onChange={onChangeInput}
              />
            </div>

            <label htmlFor="date">Date: {note.date} </label>
            <div className="row">
              <input
                className="input mx-auto"
                type="date"
                id="date"
                name="date"
                onChange={onChangeInput}
              />
            </div>

            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

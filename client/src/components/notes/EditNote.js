import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
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

export default function EditNote({ match, i }) {
  const [modal, setModal] = useState(true);
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });
  const toggle = () => setModal(!modal);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
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
      {" "}
      {/* <Modal isOpen={modal} toggle={toggle} modalClassName="modal">
        <ModalHeader toggle={toggle}>Edit Note</ModalHeader>
        <ModalBody>
          <form onSubmit={editNote} autoComplete="off">
            <div className="row">
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
      </Modal> */}
      <div className="edit mx-auto">
        <h1 className="text-center mt-5">Edit Note</h1>
        <form onSubmit={editNote} className="modal2 mx-auto" autoComplete="off">
          <div className="row">
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
      </div>
    </>
  );
}

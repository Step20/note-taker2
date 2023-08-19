import React from "react";
import Header from "./notes/Nav";
import Home from "./notes/Home";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
} from "react-router-dom";

export default function Notes({ setIsLogin }) {
  const { id } = useParams();

  return (
    <>
      <BrowserRouter>
        <div className="notes-page">
          <section>
            <Header setIsLogin={setIsLogin} />
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/edit/:id" element={<EditNote />} exact />
            </Routes>
          </section>
        </div>
      </BrowserRouter>
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from '../components/Navbar';
import CheckBox from '../tools/checkBox';
import { json, useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
  let { id } = useParams();
  const editorRef = useRef(null);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const [isImportant, setIsImportant] = useState(false);
  let navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    let res = fetch("http://localhost:8000/updateNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: desc, content: content, isImportant: isImportant, uploadedBy: localStorage.getItem("userID"), noteId: id })
    }).then(response => response.json()).then(data => {
      if (data.success) {
        alert("Note Updated Successfully")
        navigate("/");
      }
      else {
        alert("Error Adding Note..!")
      }
    })
  };

  const getNote = () => {
     let res = fetch("http://localhost:8000/getNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId: id })
     }).then(response => response.json()).then(data => {
      setTitle(data.title);
      setDesc(data.description);
      setContent(data.content);
      setIsImportant(data.isImportant);
     })
  };

  useEffect(() => {
    getNote()
  }, [])


  return (
    <>
      <Navbar />
      <div className="EditNoteCon min-h-screen px-[50px]">
        <form onSubmit={submitForm} className="my-5">
          <h3 className="m-0 p-0 text-2xl mb-5">Edit Note</h3>

          <div className="inputBox !block !bg-transparent">
            <label htmlFor="title" className="my-2">Enter A Note Title</label>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full p-2 rounded-md mt-1"
              style={{ border: "2px solid #555" }}
              name="title"
              id="title"
              onChange={(e) => { setTitle(e.target.value) }}
              value={title}
              required
            />
          </div>

          <div className="inputBox !block !bg-transparent">
            <label htmlFor="description" className="my-2">Enter A Note Description</label>
            <textarea
              type="text"
              placeholder="Note Description"
              className="w-full p-2 rounded-md mt-1 min-h-[100px]"
              style={{ border: "2px solid #555" }}
              name="description"
              id="description"
              onChange={(e) => { setDesc(e.target.value) }}
              value={desc}
              required
            ></textarea>
          </div>

          <CheckBox title="is Important" check={isImportant} setCheck={setIsImportant} />

          <JoditEditor
            ref={editorRef}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onChange={newContent => setContent(newContent)}
          />

          <button className="btnNormal my-3 !min-w-[200px]" type="submit">Update Note</button>
        </form>
      </div>

    </>
  );
};

export default EditNote;

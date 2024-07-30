import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Note = ({ note, height, index }) => {

  let navigate = useNavigate();

  const [isDelteModel, setIsDelteModel] = useState(false);

  const delteNote = (id, noteID) => {
    console.log("ID : ", id, noteID);
    let res = fetch("http://localhost:8000/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ noteId: id })
    }).then(resp => resp.json()).then(data => {
      console.log(data);
      if (data.success) {
        // document.getElementById(noteID).remove();
        window.location.reload();
      }
      else {
        alert("Something went wrong");
      }
    }).catch(err => console.log(err));
    setIsDelteModel(false);
  }

  const editNote = (id) => {
    navigate(`/editNote/${id}`);
  }

  return (
    <>
      <div className="note relative" id={`note${index}`} style={{ height: height }}>
        <div onClick={()=>{navigate(`/singleNotePage/${note._id}`)}}>

        <div className="flex items-center justify-between">
          <p className='text-[gray]'>Note {index + 1}</p>
          {
            note.isImportant ?
              <p className='p-[3px] bg-green-500 text-white px-[10px] rounded-lg'>Important</p> : ""
          }
        </div>
        <h1 className='text-[#000] text-[20px] line-clamp-1 w-[80%]'>{note.title}</h1>
        <p className='text-[gray] line-clamp-4 w-[80%]'>{note.description}</p>
        </div>

        <div className="noteBottom absolute bottom-5 w-[93%] flex justify-between items-center">
          <p className='text-[gray]'>{new Date(note.date).toDateString()}</p>

          <div className='flex items-center gap-1'>
            <img className=' w-[30px] h-[30px]' onClick={() => setIsDelteModel(true)} src={require("../Images/delete.png")} alt="" />
            <img className=' w-[35px] h-[35px]' onClick={() => editNote(note._id)} src={require("../Images/edit.png")} alt="" />
          </div>
        </div>
      </div>

      {
        isDelteModel ?
          <>
            <div className="deleteNoteModalCon flex items-center justify-center flex-col fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,.1)] z-[100]">
              <div className="deleteNoteModalBody relative p-[15px] w-[30vw] h-[20vh] rounded-md bg-[#fff] shadow-lg">
                <h3 className='text-[20px]'>Delete Note “<span className='text-[#578df5]'>Web Design</span>”</h3>
                <p className='m-0 p-0 text-[gray] text-[16px] leading-[1]'>Do You want To Delete This Note <br /> Yes / No</p>

                <div className="flex items-center gap-2 absolute bottom-[5%] w-full">
                  <button onClick={() => delteNote(note._id, `note${index}`)} className="delete min-w-[46%] p-[8px] bg-[#f55757] text-[#fff] border-0 outline-0 cursor-pointer">Delete</button>
                  <button onClick={()=>{setIsDelteModel(false)}} className="cancel min-w-[46%] p-[8px] bg-[#578df5] text-[#fff] border-0 outline-0 cursor-pointer">Cancel</button>
                </div>

              </div>
            </div>
          </>
          : ""
      }
    </>
  )
}

export default Note
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Note from '../components/Note'
import Fotter from '../components/Fotter'
import Oops from '../components/Oops'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);

  let getNotes = () => {
    let res = fetch("http://localhost:8000/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID")
      })
    }).then(resp => resp.json()).then(data => {
      if (data.success === false) {
        setError(data.msg)
      }
      else {
        setData(data);
        console.log(data)
      }
    });
  };

  function getUserDetails() {
    fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID")
      })
    }).then(resp => resp.json()).then(data => {
      if (data.success === false) {
        navigate("/login");
      }
      else {
        setUserData(data);
      }
    })
  }

  useEffect(() => {
    getNotes();
    getUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className=' mt-[20px] flex items-center justify-between w-screen px-[50px]'>
        <h1 className='text-2xl'>Hi, {userData ? userData.name : ""}</h1>

        <div className="inputBox !w-[380px]">
          <input onKeyUp={(e) => {
            if (e.key === "Enter") {
              navigate(`/search?query=${query}`);
            }
          }} onChange={(e) => { setQuery(e.target.value) }} value={query} type="text" placeholder='Search Notes' className=' !p-[11px]' />
        </div>
      </div>

      <div className="gridItems">
        {
          data ? data.map((el, index) => {
            return (
              <>
                <Note key={index} index={index} note={el} />
              </>
            )
          }) : <Oops title={"No Note Found"} image={require("../Images/oops2.png")} buttonTitle={"Add Note"} buttonLink={"/addNewNote"} />
        }
      </div>

      <Fotter />
    </>
  )
}

export default Home
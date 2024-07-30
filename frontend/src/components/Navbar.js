import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const Navbar = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);


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
    getUserDetails();
  }, []);

  return (
    <>
      <div className="navbar w-screen h-[90px] bg-[#F4F4F4] px-[50px] flex items-center justify-between">
        <div className="logo text-2xl">Keep Notes</div>

        <div className="right flex items-center gap-[20px]">
          <button className="btnNormal" onClick={()=>{navigate("/addNewNote")}}>Add Note</button>
          <Avatar onClick={()=>{navigate("/profile")}} name={userData ? userData.username : ""} size="50" round="50%" style={{cursor:"pointer"}}/>
          {/* <div className="profileCircle w-[40px] cursor-pointer h-[40px] rounded-[50%] bg-[#D9D9D9]"></div> */}
        </div>
      </div>
    </>
  )
}

export default Navbar
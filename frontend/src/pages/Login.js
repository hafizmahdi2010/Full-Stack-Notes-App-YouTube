import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:8000/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    });

    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert("Login successfull");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userID", data.userID);
      navigate("/");
    }
    else {
      setError(data.message);
      alert(data.message);
    }


  }


  return (
    <>
      <div className="container bg-[#F4F4F4] flex items-center flex-col justify-center min-h-[100vh]">
        
        <form onSubmit={handleSubmit} action="" className='form'>
          <h3 className='text-center text-[26px] mb-5 mt-3'>Login</h3>

          <div className="inputBox">
            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email' name='email' id='email' required/>
          </div>

          <div className="inputBox">
            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" placeholder='Password' name='password' id='password' required/>
          </div>

          <button className="btnBig mt-3 mb-3">Login</button>

          <p className='mb-3 mt-2'>Don't Have An Account <Link className='text-[#578DF5]' to="/signUp">Sign Up</Link></p>

        </form>

      </div>
    </>
  )
}

export default Login
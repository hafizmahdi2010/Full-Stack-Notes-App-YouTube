import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("")

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:8000/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        username
      })
    });

    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert("Registration successfull");
      navigate("/login");
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
          <h3 className='text-center text-[26px] mb-5 mt-3'>Sign Up</h3>

          <div className="inputBox">
            <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder='Username' name='username' id='username' required/>
          </div>

          <div className="inputBox">
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' name='name' id='name' required/>
          </div>

          <div className="inputBox">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' name='email' id='email' required/>
          </div>

          <div className="inputBox">
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' name='password' id='password' required/>
          </div>

          <button className="btnBig mt-3 mb-3">Sign Up</button>

          <p className='mb-3 mt-2'>Already Have An Account <Link className='text-[#578DF5]' to="/login">Login</Link></p>

        </form>

      </div>
    </>
  )
}

export default SignUp
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import "./App.css"
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import AddNote from './pages/AddNote';
import SingleNotePage from './pages/SingleNotePage';
import EditNote from './pages/EditNote';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

          
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addNewNote' element={<AddNote />} />
          <Route path='/singleNotePage/:id' element={<SingleNotePage />} />
          <Route path='/editNote/:id' element={<EditNote />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
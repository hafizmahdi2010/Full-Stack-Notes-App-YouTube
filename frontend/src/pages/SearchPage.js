import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Fotter from '../components/Fotter';
import Oops from '../components/Oops';
import oopsImg from "../Images/oops2.png";
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const myParam = searchParams.get('query');

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (data.length > 0 && myParam) {
      const filtered = data.filter(note => 
        note.title.toLowerCase().includes(myParam.toLowerCase()) || 
        note.description.toLowerCase().includes(myParam.toLowerCase()) ||
        note.content.toLowerCase().includes(myParam.toLowerCase())
      );
      setFilteredData(filtered);
      console.log('Filtered Data:', filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, myParam]);

  const getNotes = () => {
    fetch("http://localhost:8000/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID")
      })
    })
    .then(resp => resp.json())
    .then(responseData => {
      if (responseData.success === false) {
        setError(responseData.msg);
      } else {
        console.log('Fetched Data:', responseData);
        setData(responseData);  // Directly using the array of notes
      }
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes.');
    });
  };

  return (
    <>
      <Navbar/>
      <div className="div flex items-center pr-5 pt-4 justify-end">
        <div className="inputBox !w-[400px] !p-[5px]">
          <input type="text" placeholder='Search Notes' />
        </div>
      </div>
      <div className="gridItems gridOne">
        {
          error ? 
            <Oops title={error} image={oopsImg} buttonTitle="Go Back" buttonLink="/" /> :
            (!myParam || (filteredData && filteredData.length === 0)) ? 
              <Oops title={`No Search Results Found for "${myParam || ''}"`} image={oopsImg} buttonTitle="Go Back" buttonLink="/" /> :
              filteredData.map((el, index) => (
                <Note key={el._id} index={index} note={el} height="180px" />
              ))
        }
      </div>
      <Fotter/>
    </>
  );
};

export default SearchPage;

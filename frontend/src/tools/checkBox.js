import React, { useEffect } from 'react'

const CheckBox = ({ check, setCheck, title }) => {

  const toggleCheckBox = () => {
    let checkBox = document.querySelector('.checkBox');
    checkBox.classList.toggle("active");
    setCheck(!check);
  }

  useEffect(() => {
    let checkBox = document.querySelector('.checkBox');
    check ? checkBox.classList.add("active") : checkBox.classList.remove("active"); //if check is true add active class to checkbox else remove it
  }, [check])

  return (
    <>
      <div onClick={toggleCheckBox} className="flex items-center gap-2 mb-3">
        <div className="checkBox w-[20px] cursor-pointer h-[20px] bg-[gray]"></div>
        <p>{title}</p>
      </div>
    </>
  )
}

export default CheckBox

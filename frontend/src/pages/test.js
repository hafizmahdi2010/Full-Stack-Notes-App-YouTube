import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { RiCloseLargeFill } from 'react-icons/ri';
import Select from 'react-select';
import Editor from '@monaco-editor/react';


const AddNote = () => {

  const codeLanguages = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'python' },
    { value: 'php', label: 'Php' },
    { value: 'c++', label: 'C++' },
  ];

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const [selectedLanguage, setSelectedLanguage] = useState(codeLanguages[0]);

  const handleChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [codeContent, setCodeContent] = useState("")

  const [isCodeBlockModalShow, setIsCodeBlockModalShow] = useState(false);
  const [isCodeBlockFullscreen, setIsCodeBlockFullscreen] = useState(false);

  const addCode = () => {
    setIsCodeBlockModalShow(true)
  }

  const addCodeBlock = () => {
    let container = document.querySelector('.jodit-wysiwyg');
    console.log(container.textContent);
  }

  const addCodeOption = () => {
    let container = document.querySelector('.jodit-ui-group_separated_true');
    if (!container) {
      console.error("Container not found");
      return;
    }
    console.log(container);

    let optionButton = document.createElement("button");
    optionButton.className = "jodit-toolbar-button__button";
    optionButton.setAttribute("type", "button");
    optionButton.setAttribute("role", "button");
    optionButton.setAttribute("aria-pressed", false);
    optionButton.setAttribute("tabindex", -1);

    let buttonIcon = document.createElement("span");
    buttonIcon.className = "jodit-toolbar-button__icon";

    let icon = "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-code-line-icon-vector-png-image_6691024.png";

    let img = document.createElement("img");
    img.src = icon;
    img.className = "w-5 h-5";
    buttonIcon.appendChild(img);

    optionButton.appendChild(buttonIcon);

    let buttonText = document.createElement("span");
    buttonText.className = "jodit-toolbar-button__text";
    // buttonText.innerText = "Code";
    optionButton.appendChild(buttonText);

    optionButton.addEventListener("click", addCode);

    container.appendChild(optionButton);
  }

 
  useEffect(() => {
    addCodeOption();
  }, []); // Empty dependency array ensures this runs only once when component mounts


  return (
    <>
      <Navbar />
      <div className="addNoteCon min-h-screen px-[50px]">

        <form className='my-5'>
          <h3 className='m-0 p-0 text-2xl mb-5'>Create A New Note</h3>

          <div className="inputBox !block !bg-transparent">
            <label htmlFor="title" className='my-2'>Enter A Note Title</label>
            <input
              type="text"
              placeholder='Note Title'
              className='w-full p-2 rounded-md mt-1'
              style={{ border: "2px solid #555" }}
              name="title"
              id='title'
              required
            />
          </div>

          <div className="inputBox !block !bg-transparent">
            <label htmlFor="title" className='my-2'>Enter A Note Title</label>
            <textarea
              type="text"
              placeholder='Note Description'
              className='w-full p-2 rounded-md mt-1 min-h-[100px]'
              style={{ border: "2px solid #555" }}
              name="title"
              id='description'
              required
            ></textarea>
          </div>

          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onChange={newContent => setContent(newContent)}
          />

          <button type='button' onClick={() => insertTextAtCursor('hello')}>Insert "hello"</button>
          <button className="btnNormal my-3 !min-w-[200px]" type="submit">Add Note</button>
        </form>

      </div>
      <Fotter />

      {
        isCodeBlockModalShow ?
          <div className="addCodeModalCon fixed flex items-center flex-col justify-center h-screen top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)]">
            <div className="addCodeModal p-[20px] w-[40vw] min-h-[70vh] resize-y bg-white">
              <div className='flex items-center justify-between' style={{ borderBottom: "3px solid gray", paddingBottom: 5 }}>
                <h3 className='text-xl'>Add Code Block</h3>

                <div className='flex items-center gap-2 text-[18px]'>
                  <button>{isCodeBlockFullscreen === false ? <BsArrowsFullscreen /> : <AiOutlineFullscreenExit />}</button>
                  <button className='text-[23px]' onClick={() => setIsCodeBlockModalShow(false)}><RiCloseLargeFill /></button>
                </div>
              </div>

              <Select
                value={selectedLanguage}
                onChange={handleChange}
                options={codeLanguages}
                defaultValue={codeLanguages[0]}
                className="mt-3"
                placeholder="Select a language"
              />

              <Editor
                height="70%"
                language={selectedLanguage.value}
                value={codeContent}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                className='mt-2'
                onChange={(value) => setCodeContent(value)}
              />

              <button onClick={addCodeBlock} className='p-[10px] min-w-[120px] bottom-0 outline-0 rounded-md cursor-pointer text-white bg-[#578DF5] mt-2'>Add Code Block</button>

            </div>
          </div>
          : ""
      }

    </>
  )
}

export default AddNote
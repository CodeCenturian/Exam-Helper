import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [screenshots , setScreenshots] = useState([]);

  useEffect(() => {
    const handlePaste = (event) => {
    const items = event.clipboardData.items; // get items from clipboard
    for (let item of items) {
      if (item.type.startsWith('image/')) { // check if item is image
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          setScreenshots((prev) => [...prev, e.target.result]); // add image to state
        };
        reader.readAsDataURL(file); // read image as data URL
      }
    }
  };

  window.addEventListener('paste' , handlePaste); // add event listener for paste
  return () => {
    window.removeEventListener('paste' , handlePaste); // remove event listener for paste
  };
  }, []);

  return (
    <>
      <div className='min-h-screen bg-gray-900 text-white p-6'>
        <h1 className='text-2xl font-bold mb-6'>
          Exam Helper
        </h1>

        {/* Screenshot grid */}

        <div className='grid grid-cols-3 gap-4'>
          {screenshots.map((src , index) => (
            <img
            key={index}
            src={src}
            className='rounded-lg border border-gray-700'
            />
            ))}
        </div>
        {screenshots.length === 0 && (
          <p className='text-center text-gray-400'>No screenshots uploaded</p>
          )}
      </div>
    </>
  );
}

export default App;

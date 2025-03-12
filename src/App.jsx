// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// function Form() {
//   const [value, setValue] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [darkMode, setDarkMode] = useState(false); // Dark mode state

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (value.trim()) {
//       if (editIndex !== null) {
//         const updatedTasks = [...tasks];
//         updatedTasks[editIndex] = value;
//         setTasks(updatedTasks);
//         setEditIndex(null);
//       } else {
//         setTasks([...tasks, value]);
//       }
//       setValue('');
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   const handleEdit = (index) => {
//     setValue(tasks[index]);
//     setEditIndex(index);
//   };

//   const toggleMode = () => setDarkMode((prevMode) => !prevMode);

//   const appStyle = {
//     backgroundColor: darkMode ? '#121212' : '#f5f5f5',
//     color: darkMode ? '#ffffff' : '#000000',
//     minHeight: '100vh',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     transition: 'background-color 0.3s, color 0.3s',
//   };

//   const navbarStyle = {
//     backgroundColor: darkMode ? '#333333' : '#ffffff',
//     color: darkMode ? '#ffffff' : '#000000',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px 20px',
//     borderBottom: `2px solid ${darkMode ? '#444' : '#ddd'}`,
//   };

//   const buttonStyle = {
//     backgroundColor: darkMode ? '#444444' : '#e0e0e0',
//     color: darkMode ? '#ffffff' : '#000000',
//     border: 'none',
//     borderRadius: '5px',
//     padding: '5px 10px',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={appStyle}>
//       {/* Navbar */}
//       <div style={navbarStyle}>
//         <div></div> {/* Placeholder for left-aligned content */}
//         <h1 style={{ margin: 0 }}>Task Manager</h1>
//         <button style={buttonStyle} onClick={toggleMode}>
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           backgroundColor: darkMode ? '#1e1e1e' : 'navy',
//           padding: '20px',
//           margin: '20px auto',
//           border: `2px solid ${darkMode ? '#444' : '#fff'}`,
//           width: '300px',
//           height: '150px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderRadius: '8px',
//           color: darkMode ? '#ffffff' : '#ffffff',
//         }}
//       >
//         <input
//           type="text"
//           placeholder="What task for Today?"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           style={{
//             fontSize: '15px',
//             color: darkMode ? '#ffffff' : '#000000',
//             backgroundColor: darkMode ? '#333333' : '#ffffff',
//             padding: '8px',
//             width: '100%',
//             marginBottom: '10px',
//             border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
//             borderRadius: '4px',
//           }}
//         />
//         <button
//           type="submit"
//           disabled={!value.trim()}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: darkMode ? '#444444' : '#ffffff',
//             color: darkMode ? '#ffffff' : '#000000',
//             border: `2px solid ${darkMode ? '#555' : '#fff'}`,
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           {editIndex !== null ? 'Update Task' : 'Add Task'}
//         </button>
//       </form>

//       {/* Task List */}
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <h2 style={{ color: darkMode ? '#ffffff' : 'navy', marginBottom: '10px' }}>
//           Task List
//         </h2>
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           {tasks.map((task, index) => (
//             <li
//               key={index}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
//                 borderRadius: '4px',
//                 backgroundColor: darkMode ? '#1e1e1e' : '#f9f9f9',
//               }}
//             >
//               <span style={{ fontWeight: 'bold' }}>
//                 {index + 1}. {task}
//               </span>
//               <div>
//                 <button
//                   onClick={() => handleEdit(index)}
//                   style={{
//                     marginRight: '8px',
//                     padding: '4px 8px',
//                     backgroundColor: darkMode ? '#444444' : 'navy',
//                     border: 'none',
//                     borderRadius: '5px',
//                     color: 'white',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <FontAwesomeIcon icon={faEdit} /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(index)}
//                   style={{
//                     padding: '4px 8px',
//                     backgroundColor: 'red',
//                     border: 'none',
//                     borderRadius: '5px',
//                     color: 'white',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <FontAwesomeIcon icon={faTrash} /> Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // export default Form;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Form() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = value;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, value]);
      }
      setValue('');
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setValue(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'navy',
          padding: '20px',
          margin: '4px auto',
          border: '2px solid #fff',
          width: '300px',
          height: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          color: 'white',
        }}
      >
        <input
          type="text"
          placeholder="What task for Today?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            fontSize: '15px',
            color: 'black',
            fontStyle: 'italic',
            padding: '8px',
            width: '100%',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            border: '2px solid #fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ color: 'navy', marginBottom: '10px' }}>Task List</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {index + 1}. {task}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    marginRight: '8px',
                    padding: '4px 8px',
                    backgroundColor: 'navy',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'red',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Form;

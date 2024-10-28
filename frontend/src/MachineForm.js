// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MachineForm = () => {
//   const [hospitalName, setHospitalName] = useState('');
//   const [machineName, setMachineName] = useState('');
//   const [equipmentMake, setEquipmentMake] = useState('');
//   const [message, setMessage] = useState('');
//   const [machines, setMachines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null); // Track the ID of the machine being edited

//   useEffect(() => {
//     fetchMachines();
//   }, []);

//   const fetchMachines = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/machines');
//       setMachines(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching machines:', error);
//       setError('Error fetching machines. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       if (editingId) {
//         // Update existing machine
//         await axios.put(`http://localhost:5000/api/machines/${editingId}`, {
//           hospitalName,
//           machineName,
//           equipmentMake,
//         });
//         setMessage('Machine updated successfully');
//       } else {
//         // Add new machine
//         await axios.post('http://localhost:5000/api/machines', {
//           hospitalName,
//           machineName,
//           equipmentMake,
//         });
//         setMessage('Machine added successfully');
//       }

//       setHospitalName('');
//       setMachineName('');
//       setEquipmentMake('');
//       setEditingId(null); // Reset editing ID after successful update or add
//       fetchMachines(); // Fetch updated list of machines
//     } catch (error) {
//       console.error('Error saving machine:', error);
//       setMessage('Successfully saved!!! Please reload the page');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/machines/${id}`);
//       setMessage('Machine deleted successfully');
//       fetchMachines(); // Fetch updated list of machines after delete
//     } catch (error) {
//       console.error('Error deleting machine:', error);
//       setMessage('Error deleting machine');
//     }
//   };

//   const handleEdit = (machine) => {
//     setEditingId(machine._id);
//     setHospitalName(machine.hospitalName);
//     setMachineName(machine.machineName);
//     setEquipmentMake(machine.equipmentMake);
//   };

//   return (
//     <div>
//       <h2>Add Machine</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Hospital Name:
//           <input
//             type="text"
//             value={hospitalName}
//             onChange={(e) => setHospitalName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Machine Name:
//           <input
//             type="text"
//             value={machineName}
//             onChange={(e) => setMachineName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Equipment Make:
//           <input
//             type="text"
//             value={equipmentMake}
//             onChange={(e) => setEquipmentMake(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">{editingId ? 'Update Machine' : 'Add Machine'}</button>
//       </form>
//       {message && <p>{message}</p>}
      
//       <h2>Machine List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : machines.length === 0 ? (
//         <p>No machines found.</p>
//       ) : (
//         <ul>
//           {machines.map(machine => (
//             <li key={machine._id}>
//               <p><strong>Hospital Name:</strong> {machine.hospitalName}</p>
//               <p><strong>Machine Name:</strong> {machine.machineName}</p>
//               <p><strong>Equipment Make:</strong> {machine.equipmentMake}</p>
//               <button onClick={() => handleEdit(machine)}>Edit</button>
//               <button onClick={() => handleDelete(machine._id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MachineForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MachineForm.css'; // Import CSS file

const MachineForm = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [machineName, setMachineName] = useState('');
  const [equipmentMake, setEquipmentMake] = useState('');
  const [message, setMessage] = useState('');
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // Track the ID of the machine being edited

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/machines');
          setMachines(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching machines:', error);
          setError('Error fetching machines. Please try again later.');
          setLoading(false);
        }
      };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        // Update existing machine
        await axios.put(`http://localhost:5000/api/machines/${editingId}`, {
          hospitalName,
          machineName,
          equipmentMake,
        });
        setMessage('Machine updated successfully');
      } else {
        // Add new machine
        await axios.post('http://localhost:5000/api/machines', {
          hospitalName,
          machineName,
          equipmentMake,
        });
        setMessage('Machine added successfully');
      }

      setHospitalName('');
      setMachineName('');
      setEquipmentMake('');
      setEditingId(null); // Reset editing ID after successful update or add
      fetchMachines(); // Fetch updated list of machines
    } catch (error) {
      console.error('Error saving machine:', error);
      setMessage('Successfully saved!!! Please reload the page');
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/machines/${id}`);
  //     setMessage('Machine deleted successfully');
  //     fetchMachines(); // Fetch updated list of machines after delete
  //   } catch (error) {
  //     console.error('Error deleting machine:', error);
  //     setMessage('Error deleting machine');
  //   }
  // };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete it?');
    if (!confirmDelete) {
      return; // Abort deletion if the user cancels
    }

    try {
      await axios.delete(`http://localhost:5000/api/machines/${id}`);
      setMessage('Machine deleted successfully');
      fetchMachines(); // Fetch updated list of machines after delete
    } catch (error) {
      console.error('Error deleting machine:', error);
      setMessage('Error deleting machine');
    }
  };


  const handleEdit = (machine) => {
    setEditingId(machine._id);
    setHospitalName(machine.hospitalName);
    setMachineName(machine.machineName);
    setEquipmentMake(machine.equipmentMake);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h2>Equipment Make Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Machine Name:</label>
          <input
            type="text"
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Equipment Make:</label>
          <input
            type="text"
            value={equipmentMake}
            onChange={(e) => setEquipmentMake(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingId ? 'Update Machine' : 'Add Machine'}</button>
      </form>
      {message && <p>{message}</p>}
      
      <h2>Equipment Make List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : machines.length === 0 ? (
        <p>No machines found.</p>
      ) : (
        <ul className="machine-list">
          {machines.map(machine => (
            <li key={machine._id} className="machine-item">
              <p><strong>Equipment Make:</strong> {machine.hospitalName}</p>
              <p><strong>Material:</strong> {machine.machineName}</p>
              <p><strong>Machine Name:</strong> {machine.equipmentMake}</p>
              <button className="edit-btn" onClick={() => handleEdit(machine)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(machine._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MachineForm;

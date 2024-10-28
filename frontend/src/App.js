import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MachineForm from './MachineForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MachineForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

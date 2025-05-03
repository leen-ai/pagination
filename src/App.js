import React from 'react';
import UserTable from './components/UserTable';
import FileUploader from './components/FileUploader';
import FileDownloader from './components/FileDownloader';
import './style.css';

function App() {
  return (
    <div className="p-4">
      <h1>Your Gateway to Knowledge </h1>
      <p>Knowledge at Your Fingertips</p>
      <UserTable />
      <hr />
      <FileUploader />
      <hr />
      <FileDownloader />
    </div>
  );
}

export default App;
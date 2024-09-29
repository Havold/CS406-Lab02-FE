import { useContext, useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { UploadContext } from "../../context/UploadContext";

const Home = () => {
  const { image, setImage } = useContext(UploadContext);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
      navigate("/result");
    }
  };

  return (
    <div className="home">
      <div className="card">
        <div className="title">
          <h3>Welcome to</h3>
          <h1>METAN</h1>
          <p>A website for finding similar images based on histogram values.</p>
        </div>
        <input type="file" id="uploadFile" onChange={handleUpload} />
        <label htmlFor="uploadFile">Upload</label>
      </div>
    </div>
  );
};

export default Home;

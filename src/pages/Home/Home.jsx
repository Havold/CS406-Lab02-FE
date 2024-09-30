import { useContext, useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { UploadContext } from "../../context/UploadContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const { image, setImage, setIsEqualized } = useContext(UploadContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newFile) => {
      newFile.preview = URL.createObjectURL(newFile);
      setImage(newFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      mutation.mutate(file);
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
        <div className="buttons">
          <div className="item">
            <input
              type="file"
              id="uploadFile"
              onChange={(e) => {
                setIsEqualized(false);
                handleUpload(e);
              }}
            />
            <label htmlFor="uploadFile">Upload</label>
          </div>
          <div className="item">
            <input
              type="file"
              id="uploadFileEqualized"
              onChange={(e) => {
                setIsEqualized(true);
                handleUpload(e);
              }}
            />
            <label className="equalized" htmlFor="uploadFileEqualized">
              Upload And Equalized
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useContext, useEffect } from "react";
import "./result.scss";
import { UploadContext } from "../../context/UploadContext";
import ResultImage from "../../components/ResultImage/ResultImage";

function Result() {
  const { image, setImage } = useContext(UploadContext);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
  };

  const data = [
    {
      id: 1,
      url: "/images/01.jpg",
      name: "Image name",
      distance: 200,
    },
    {
      id: 2,
      url: "/images/01.jpg",
      name: "Image name",
      distance: 200,
    },
    {
      id: 3,
      url: "/images/01.jpg",
      name: "Image name",
      distance: 200,
    },
  ];

  return (
    <div className="result">
      <div className="left">
        <div className="top">Upload Image</div>
        <div className="uploadContainer">
          {image ? <img src={image.preview} alt="" /> : <></>}
          {image ? <span>{image.name}</span> : <></>}
        </div>
      </div>
      <div className="center">
        <input
          style={{ display: "none" }}
          type="file"
          id="uploadFile"
          onChange={handleUpload}
        />
        <label htmlFor="uploadFile">Upload again</label>
      </div>
      <div className="right">
        <div className="top">Result Images</div>
        {data.map((image) => (
          <ResultImage
            key={image.id}
            url={image.url}
            name={image.name}
            distance={image.distance}
          />
        ))}
      </div>
    </div>
  );
}

export default Result;

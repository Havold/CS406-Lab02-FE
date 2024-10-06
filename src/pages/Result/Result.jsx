import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./result.scss";
import { UploadContext } from "../../context/UploadContext";
import ResultImage from "../../components/ResultImage/ResultImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function Result() {
  const { image, setImage, isEqualized, setIsEqualized } =
    useContext(UploadContext);
  const [isLoading, setIsLoading] = useState(false);
  const [top, setTop] = useState('10');
  const queryClient = useQueryClient();
  let { isPending, error, data } = useQuery({
    queryKey: ["images"],
    queryFn: () => {
      setIsLoading(true);
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        return makeRequest
          .post("/upload?equalized=" + isEqualized + '&top=' + top, formData)
          .then((res) => {
            setIsLoading(false);
            console.log(res.data.similarImages);
            return res.data.similarImages;
          });
      }
      return null;
    },
    enabled: !!image, // Chỉ chạy query khi image có giá trị
  });

  const mutation = useMutation({
    mutationFn: (newFile) => {
      newFile.preview = URL.createObjectURL(newFile);
      setImage(newFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const handleUpload = (e, equalized = false) => {
    const file = e.target.files[0];
    if (file) {
      setIsEqualized(equalized);
      mutation.mutate(file);
    }
  };

  const handleChange = (e) => {
    setTop(e.target.value)
    mutation.mutate(image);
  } 

  return (
    <div className="result">
      <Link to='/'><ArrowBackRoundedIcon className="backIcon" /></Link>
      <div className="left">
        {image ? <div className="top">Upload Image</div> : <></>}
        <div className="uploadContainer">
          {image ? <img src={image.preview} alt="" /> : <></>}
          {image ? <span>{image.name}</span> : <></>}
        </div>
      </div>
      <div className="center">
        <div className="buttons">
          <div className="filter">
            <label htmlFor="selectTop">Select Top Images To Filter</label>
            <select value={top} name="Top" id="selectTop" onChange={handleChange}>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="item">
            <input
              type="file"
              id="uploadFile"
              onChange={(e) => {
                handleUpload(e, false);
              }}
            />
            <label htmlFor="uploadFile">Upload</label>
          </div>
          <div className="item">
            <input
              type="file"
              id="uploadFileEqualized"
              onChange={(e) => {
                handleUpload(e, true);
              }}
            />
            <label className="equalized" htmlFor="uploadFileEqualized">
              Upload And Equalized
            </label>
          </div>
        </div>
      </div>
      <div className="right">
        {data ? <div className="top">Top {top} Similar Images</div> : <></>}
        {error ? (
          "Something went wrong!"
        ) : isLoading ? (
          "Loading..."
        ) : data ? (
          data.map((image, index) => (
            <ResultImage
              key={index}
              url={"http://localhost:5000/" + image.image_url}
              name={image.img_name}
              distance={image.distance}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Result;

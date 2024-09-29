import { useContext, useEffect, useState } from "react";
import "./result.scss";
import { UploadContext } from "../../context/UploadContext";
import ResultImage from "../../components/ResultImage/ResultImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import NavBar from "../../components/NavBar/NavBar";

function Result() {
  const { image, setImage } = useContext(UploadContext);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  let { isPending, error, data } = useQuery({
    queryKey: ["images"],
    queryFn: () => {
      setIsLoading(true);
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        return makeRequest.post("/upload", formData).then((res) => {
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

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="result">
        <div className="left">
          {image ? <div className="top">Upload Image</div> : <>a</>}
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
          {data ? <div className="top">Result Images</div> : <></>}
          {error ? (
            "Something went wrong!"
          ) : isLoading ? (
            "Loading..."
          ) : data ? (
            data.map((image, index) => (
              <ResultImage
                key={index}
                url={"http://127.0.0.1:5000/" + image.image_url}
                name={image.img_name}
                distance={image.distance}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;

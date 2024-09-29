import "./resultImage.scss";

const ResultImage = ({ url, name, distance }) => {
  return (
    <div className="resultImage">
      <div className="left">
        <span>Distance: {distance}</span>
      </div>
      <div className="right">
        <img src={url} alt="resultImage" />
        <span>{name}</span>
      </div>
    </div>
  );
};

export default ResultImage;

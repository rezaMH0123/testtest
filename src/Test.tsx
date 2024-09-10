import "./App.css";

export default function Test() {
  return (
    <div className="modal">
      <div className="tContainer">
        {[...Array(200)].map((_, index) => (
          <div className="tItem" key={index}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

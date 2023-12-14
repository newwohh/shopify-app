import React from "react";
import "./App.css";

function App() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    const getAllBadges = async () => {
      try {
        setLoading(true);
        const sendRequest = await fetch("http://localhost:43745/badge/get")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setSelectedImages(data);
            setLoading(false);
          });
        console.log("API Response:", sendRequest);
      } catch (error) {
        console.error("Error posting to API:", error);
      }
    };

    getAllBadges();
  }, []);

  console.log(selectedImages);

  return (
    <div className="trust-badge-container" id="root">
      {loading && <div className="loader">Loading...</div>}
      {selectedImages &&
        loading === false &&
        selectedImages.badges?.map((item, index) => {
          return (
            <img
              style={{
                width: "60px",
                height: "50px",
                borderRadius: "40px",
                marginRight: "10px",
              }}
              key={index}
              src={item.url}
              alt="api"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
          );
        })}
    </div>
  );
}

export default App;

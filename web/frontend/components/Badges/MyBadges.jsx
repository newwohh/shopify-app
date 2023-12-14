import React from "react";
import BadgeModel from "./BadgeModal";

function MyBadges(props) {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [badge, setBadge] = React.useState({});

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

  const handleModalOpen = (badge) => {
    setShowModal(true);
    setBadge(badge);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8BC6EC",
        backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        transition: "opacity 2s ease",
      }}
    >
      {selectedImages?.badges?.length === 0 && (
        <div style={{ color: "white" }}>Oops No badges found</div>
      )}

      {selectedImages &&
        loading === false &&
        selectedImages.badges?.map((item, index) => {
          return (
            <img
              style={{
                width: "260px",
                height: "150px",
                objectFit: "contain",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "10px",
                backgroundColor: "white",
                // border:
                //   selectedBadge?.name === badge?.name
                //     ? "4px solid darkblue"
                //     : "1px solid white",
              }}
              key={index}
              src={item.url}
              alt="api"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleModalOpen(item)}
            />
          );
        })}
      <button
        style={{
          backgroundColor: "hsla(0, 0%, 0%, 0)",
          color: "white",
          border: "1px solid white",
          borderRadius: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={() => props.setShowMyBadges(false)}
      >
        Back
      </button>
      {showModal && (
        <BadgeModel badge={badge} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default MyBadges;

import "./App.css";
import React from "react";
import AuthComponent from "./components/AuthComponent";
import BadgeModel from "./components/BadgeModel";

function App() {
  const [showPreview, setShowPreview] = React.useState(false);
  const [badges, setBadges] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [badge, setBadge] = React.useState({});

  const handleModalOpen = (badge) => {
    setModal(true);
    setBadge(badge);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {showPreview ? (
        <div
          style={{
            width: "300px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "space-evenly",
            columnGap: "50px",
            rowGap: "50px",
          }}
        >
          {badges.map((badge) => (
            <div
              key={badge.id}
              style={{ "&:hover": { cursor: "pointer", border: "1px solid" } }}
            >
              <h3>{badge.name}</h3>
              <img
                style={{ height: "200px", width: "200px" }}
                src={badge.url}
                alt={badge.name}
                onClick={() => {
                  handleModalOpen(badge);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <AuthComponent setShowPreview={setShowPreview} setBadges={setBadges} />
      )}
      {modal && (
        <BadgeModel
          badge={badge}
          onUpdate={setBadges}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}

export default App;

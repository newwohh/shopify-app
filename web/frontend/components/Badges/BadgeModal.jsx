import React, { useState } from "react";

function BadgeModel({ badge, onUpdate, onClose }) {
  const [imageUrl, setImageUrl] = useState(badge.url);
  const [name, setName] = useState(badge.name);

  const updateBadge = async () => {
    try {
      const response = await fetch("http://localhost:43745/badge/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store: "Nevin Development Store",
          name: name,
          url: imageUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Badge updated successfully");
        console.log("Updated badge:", data);
      } else {
        console.error("Failed to update badge:", response.statusText);
        alert("Failed to update badge");
      }
    } catch (error) {
      console.error("Error updating badge:", error);
      alert("Error updating badge");
    }
  };

  const deleteBadge = async (store) => {
    try {
      const response = await fetch(`http://localhost:43745/badge/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store: "Nevin Development Store",
        }),
      });

      if (response.ok) {
        console.log("Badge deleted successfully");
        alert("Badge deleted successfully");
      } else {
        console.error("Failed to delete badge:", response.statusText);
        alert("Failed to delete badge");
      }
      onClose();
    } catch (error) {
      console.error("Error deleting badge:", error);
      alert("Error deleting badge");
      onClose();
    }
  };

  const handleUpdate = () => {
    updateBadge();

    onClose();
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={badge.url}
          alt={badge.name}
          style={{ width: "100%", marginBottom: "10px", borderRadius: "4px" }}
        />
        <label style={{ marginBottom: "10px", display: "block" }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              boxSizing: "border-box",
              borderRadius: "20px",
              borderColor: "snow",
              boxShadow: "none",
              border: "2px solid #8BC6EC",
              height: "40px",
            }}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              boxSizing: "border-box",
              borderRadius: "20px",
              borderColor: "snow",
              boxShadow: "none",
              border: "2px solid #8BC6EC",
              height: "40px",
            }}
          />
        </label>
        <button
          onClick={handleUpdate}
          style={{
            backgroundColor: "#1CAC78",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: 10,
          }}
        >
          Update
        </button>
        <button
          style={{
            backgroundColor: "#F88379",
            color: "white",
            border: "1px solid white",
            borderRadius: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onClick={() => deleteBadge(badge.store)}
        >
          Delete
        </button>
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default BadgeModel;

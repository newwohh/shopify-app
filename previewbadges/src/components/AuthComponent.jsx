import React, { useState } from "react";

function AuthComponent(props) {
  const [inputValue, setInputValue] = useState("");

  const checkStore = async () => {
    try {
      const response = await fetch("http://localhost:33025/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ store: inputValue }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === true) {
        props.setBadges(data.data);
        props.setShowPreview(true);
      }
    } catch (error) {
      console.error("Error posting to API:", error);
    }
  };

  console.log(inputValue);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your Shopify Store Name"
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={checkStore}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default AuthComponent;

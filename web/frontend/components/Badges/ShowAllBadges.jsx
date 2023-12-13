import React from "react";
import axios from "axios";
import { useAuthenticatedFetch } from "../../hooks";
import "./styles.css";

function ShowAllBadges() {
  const [selectedBadge, setSelectedBadge] = React.useState(null);

  const handleBadgeClick = (badge, event) => {
    event.stopPropagation();

    setSelectedBadge((prevSelected) => (prevSelected === badge ? null : badge));
  };

  const fetch = useAuthenticatedFetch();

  const handlePostToAPI = async () => {
    if (selectedBadge) {
      try {
        const sendRequest = await fetch("/api/badge/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            badge: {
              store: "Nevin Development Store",
              name: selectedBadge.name,
              url: selectedBadge.url,
            },
          }),
          referrerPolicy: "no-referrer",
        });
        console.log("API Response:", sendRequest);
        if (sendRequest.status === 200) {
          alert(sendRequest);
        }

        alert(selectedBadge.name + " posted successfully");
      } catch (error) {
        console.error("Error posting to API:", error);
      }
    } else {
      console.warn("No badge selected");
      alert("No badge selected");
    }
  };

  const trustBadges = [
    {
      name: "Visa",
      url: "https://cdn.freebiesupply.com/logos/large/2x/visa-logo-png-transparent.png",
    },
    {
      name: "Mastercard",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
    },
    {
      name: "Paypal",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    {
      name: "American Express",
      url: "https://w7.pngwing.com/pngs/58/14/png-transparent-amex-card-credit-logo-logos-logos-and-brands-icon.png",
    },
    {
      name: "Google Pay",
      url: "https://hindubabynames.info/wp-content/themes/hbn_download/download/banking-and-finance/google-pay-logo.png",
    },
    {
      name: "Amazon Pay",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg",
    },
  ];

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                border: selectedBadge === badge ? "2px solid red" : "none",
                textAlign: "center",
              }}
              onClick={(event) => handleBadgeClick(badge, event)}
            >
              <img
                src={badge?.url}
                alt={badge?.name}
                className="img"
                style={{
                  width: "260px",
                  height: "150px",
                  objectFit: "contain",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  border:
                    selectedBadge?.name === badge?.name
                      ? "4px solid darkblue"
                      : "1px solid white",
                }}
              />
              <h2>
                {setSelectedBadge?.name === badge?.name
                  ? badge?.name
                  : badge?.name}
              </h2>
            </div>
          ))}
        </div>
        <div>
          <button
            className="btn"
            style={{
              backgroundColor: "hsla(0, 0%, 0%, 0)",
              color: "white",
              border: "1px solid white",
              borderRadius: "10px",
              padding: "10px 20px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={handlePostToAPI}
          >
            Post to API
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowAllBadges;

const fetchBadge = async (loaded = () => {}) => {
  const element = document.createElement("script");
  element.src = "http://localhost:43745/build/static/js/main.2e1590c0.js";
  element.type = "text/javascript";
  element.onload = function () {
    loaded();
  };

  document.getElementsByTagName("head")[0].appendChild(element);
};

fetchBadge(() => {
  console.log("Badge loaded");
});

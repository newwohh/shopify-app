const fetchBadge = async (loaded = () => {}) => {
  const element = document.createElement("script");
  element.src = "http://localhost:34323/build/static/js/main.41617b41.js";
  element.type = "text/javascript";
  element.onload = function () {
    loaded();
  };
  document.getElementsByTagName("head")[0].appendChild(element);
};

fetchBadge(() => {
  console.log("Badge loaded");
});

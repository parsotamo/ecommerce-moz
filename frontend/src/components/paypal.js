import axios from "axios";

export const addPaypalScript = async (setSdkReady) => {
  const { data: clientId } = await axios.get("/api/config/paypal");
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  script.async = true;

  script.onload = () => {
    setSdkReady(true);
  };
  document.body.appendChild(script);
};

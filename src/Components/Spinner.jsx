import { TailSpin } from "react-loader-spinner";
import '../index.css';
import { useEffect, useState } from "react";

const Spinner = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const spinnerSize = screenWidth < 640 ? 100 : 200;

  return (
      <div className="spinner-container">
      <TailSpin
        visible={true}
        height={spinnerSize}
        width={spinnerSize}
        color="black"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <div
      className="spinner-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Book Store
      </div>
    </div>
  );
};

export default Spinner;

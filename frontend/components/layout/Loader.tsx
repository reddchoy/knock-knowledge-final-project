const Loader = () => {
  return (
    <>
      <div className="wrapper">
        <div className="loader"></div>
      </div>
      <style jsx>{`
        .wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #faf7f6;
          z-index: 100;
        }

        /*code for custom loading icon*/

        .loader {
          margin: auto;
          border: 10px solid #fff;
          border-radius: 50%;
          border-top: 10px solid #2a9d8f;
          width: 100px;
          height: 100px;
          animation: spinner 4s linear infinite;
        }

        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;

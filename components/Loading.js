import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
  let lprops = {
    size: 17,
    color: "green",
  };

  return (
    <div className="grid place-items-center h-screen bg-opacity-40">
      <PropagateLoader {...lprops} />;
    </div>
  );
};

export default Loading;

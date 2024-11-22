import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
      <Spinner 
        animation="border" 
        variant="danger" 
        className="m-auto h-20 w-20 border-8" // Adjusted size and border thickness
      />
    </div>
  );
}

export default LoadingSpinner;

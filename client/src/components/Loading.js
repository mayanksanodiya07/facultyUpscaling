import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div className="flex h-screen">
      <Spinner 
        animation="border" 
        variant="danger" 
        className="m-auto h-20 w-20 border-8" // Adjusted size and border thickness
      />
    </div>
  );
}

export default LoadingSpinner;

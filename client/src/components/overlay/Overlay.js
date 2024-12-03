function Overlay({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div
        className="relative bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Overlay;

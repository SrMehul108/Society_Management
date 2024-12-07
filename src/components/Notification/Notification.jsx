import { useEffect } from "react";

const Notification = ({ isVisible, message, type, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed  right-36 top-[6%] p-4 rounded-md shadow-lg w-96 h-96 z-50 transition-all duration-300 ease-in-out
      ${type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'}`} // Added 'error' and 'info' types.
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white font-bold hover:text-gray-200"
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

import { useEffect } from "react";

const Popup = ({ type = "info", message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : type === "warning"
          ? "bg-yellow-400 text-black"
          : "bg-gray-800";

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div
        className={`px-6 py-4 rounded-lg shadow-lg text-white text-center ${bgColor}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Popup;

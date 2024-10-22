import React from "react";

// Define an interface for the props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Record<string, any> | null; // Use Record to allow any key-value pairs or null
  page: number; // Assuming page is a number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item, page }) => {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold">Item Details</h2>
        {item ? ( // Check if item is not null before rendering
          <>
            <p><strong>Name:</strong> {item.name}</p>
            {Object.keys(item)
              .slice(1)
              .map((key, index) => (
                <p key={index}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {item[key]}
                </p>
              ))}
            <p><strong>Page:</strong> {page}</p>
          </>
        ) : (
          <p>No item selected.</p> // Optional: Handle the case where item is null
        )}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

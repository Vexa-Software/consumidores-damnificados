import React from 'react';

interface ConfirmAlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isLoading = false,
  confirmButtonColor = "bg-red-500",
  cancelButtonColor = "bg-sky-500"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <p className="text-lg font-bold mb-2">{title}</p>
        <p className="mb-4">{message}</p>
        <div className="flex flex-row justify-evenly gap-4">
          <button
            className={`${cancelButtonColor} text-white px-6 py-2 rounded-lg hover:opacity-90 transition`}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`${confirmButtonColor} text-white px-6 py-2 rounded-lg hover:opacity-90 transition`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert; 
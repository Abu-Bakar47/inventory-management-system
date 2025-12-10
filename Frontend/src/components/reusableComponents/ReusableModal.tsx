import { IoClose } from "react-icons/io5";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  height?: string; // e.g., 'h-[80vh]', 'max-h-[90vh]', etc.
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  height,
}) => {
  if (!isOpen) return null;

  // const sizeClasses = {
  //   sm: "w-1/3",
  //   md: "w-1/2",
  //   lg: "w-2/3",
  //   xl: "w-[90%]",
  // };

  return (
    <div
      className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-xl p-6 relative w-full lg:w-[60%] ${height ? height : 'max-h-[95vh]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        )}

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Make only content scrollable */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;

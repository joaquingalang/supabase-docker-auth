function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative bg-[#211A20] shadow-neomorphic-dark rounded-xl px-10 py-8 w-[400px] text-center">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FF97E0] text-2xl font-light hover:opacity-80"
        >
          ×
        </button>

        {/* Title */}
        <p className="font-poppins text-2xl font-light text-[#FF97E0] mb-3">
          Delete Profile?
        </p>

        {/* Description */}
        <p className="font-poppins text-white/80 mb-8 italic">
          Permanently delete your account?<br />This cannot be undone.
        </p>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className="bg-[#FF97E0] text-[#211A20] font-poppins font-medium px-10 py-2 rounded-full hover:bg-[#ffb3e8] transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;

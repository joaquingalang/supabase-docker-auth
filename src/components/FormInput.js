function FormInput({ type = "text", placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent font-poppins placeholder-[#847181] text-white text-sm font-light border-b border-[#847181] px-3 py-1 outline-none mb-4 w-full"
      />
    );
  }
  
  export default FormInput;
  
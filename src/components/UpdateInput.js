function UpdateInput({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="col-span-8 bg-transparent border-b-2 border-dotted border-[#FF97E0] w-[296px] font-poppins font-extralight text-white text-lg"
    />
  );
}

export default UpdateInput;

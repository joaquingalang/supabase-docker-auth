function GradientBackground({ children }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 1) Background color (bottom layer) */}
      <div className="absolute inset-0 bg-[#020202] z-0" />

      {/* 2) Blurs (above the bg but below content) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute w-[420px] h-[400px] bg-[#FF97E0]/10 rounded-full blur-[1000px] top-10 -left-10" />
        <div className="absolute w-[620px] h-[600px] bg-[#FF97E0]/10 rounded-full blur-[1000px] -top-[50px] -left-[100px]" />
        <div className="absolute w-[820px] h-[800px] bg-[#FF97E0]/5  rounded-full blur-[1000px] -top-[100px] -left-[200px]" />

        <div className="absolute w-[420px] h-[400px] bg-[#FF97E0]/10 rounded-full blur-[1000px] -bottom-[200px] right-[120px]" />
        <div className="absolute w-[620px] h-[600px] bg-[#FF97E0]/10 rounded-full blur-[1000px] -bottom-[300px] right-[20px]" />
        <div className="absolute w-[820px] h-[800px] bg-[#FF97E0]/5  rounded-full blur-[1000px] -bottom-[300px] -right-[10px]" />
      </div>

      {/* 3) Foreground content (on top) */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

export default GradientBackground;

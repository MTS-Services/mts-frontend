

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#191919]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-[#19B2E7] border-b-[#8F5CF7] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <h2 className="text-white text-xl font-semibold">Loading, please wait...</h2>
      </div>
    </div>
  );
};



export default Loading

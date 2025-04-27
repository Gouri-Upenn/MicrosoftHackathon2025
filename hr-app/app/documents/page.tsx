export default function DocumentsPage() {
    const files = [
      { name: "Payslip_March2025.pdf", size: "200KB" },
      { name: "LeavePolicy2025.docx", size: "150KB" },
      { name: "OfferLetter.pdf", size: "300KB" },
    ];
  
    return (
      <div className="min-h-screen bg-[#101820] text-white flex flex-col p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">My Documents</h1>
        <div className="bg-white/10 rounded-lg shadow p-6 max-w-4xl mx-auto space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-white/5 rounded-md hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#FEE715]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>{file.name}</span>
              </div>
              <span className="text-gray-400">{file.size}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
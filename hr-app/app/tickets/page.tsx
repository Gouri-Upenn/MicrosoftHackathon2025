/*app/tickets/page.tsx*/

export default function TicketsPage() {
    const tickets = [
      { id: "#12345", subject: "Leave request approval", status: "Pending" },
      { id: "#12346", subject: "Document upload issue", status: "Resolved" },
      { id: "#12347", subject: "Travel reimbursement", status: "In Progress" },
    ];
  
    return (
      <div className="min-h-screen bg-[#101820] text-white flex flex-col p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Support Tickets</h1>
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="min-w-full bg-white/10 rounded-lg shadow overflow-hidden">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Ticket ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "Resolved"
                          ? "bg-green-500/20 text-green-400"
                          : ticket.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
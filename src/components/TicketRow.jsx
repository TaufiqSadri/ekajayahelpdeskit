function TicketRow({ ticket, onClick }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Tinggi":
        return "bg-red-100 text-red-800";
      case "Sedang":
        return "bg-yellow-100 text-yellow-800";
      case "Rendah":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Baru":
        return "bg-blue-100 text-blue-800";
      case "Diproses":
        return "bg-yellow-100 text-yellow-800";
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Ditutup":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <tr
      onClick={onClick}
      className="hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        #{ticket.id}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{ticket.reporter}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{ticket.category}</td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
            ticket.priority
          )}`}
        >
          {ticket.priority}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {formatDate(ticket.date)}
      </td>
    </tr>
  );
}

export default TicketRow;

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

function Table({ columns, data, onRowClick, className = "" }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={
                  col.sortable
                    ? "cursor-pointer hover:bg-gray-100 transition-colors"
                    : ""
                }
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && sortColumn === col.key && (
                    <span className="text-ekajaya">
                      {sortDirection === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="w-12 h-12 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-sm font-medium">Tidak ada data</p>
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick && onRowClick(row)}
                className={
                  onRowClick
                    ? "hover:bg-gray-50 cursor-pointer transition-all duration-200"
                    : ""
                }
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

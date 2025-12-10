import React, { useState } from "react";

interface FilterProps {
  onFilter: (filters: { name: string; status: string }) => void;
}

const Filters: React.FC<FilterProps> = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <input
        type="text"
        placeholder="Customer Name"
        className="border rounded px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="border rounded px-3 py-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Payment Status</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => onFilter({ name, status })}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filters;

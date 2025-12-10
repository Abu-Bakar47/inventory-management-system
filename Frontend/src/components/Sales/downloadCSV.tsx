import { saveAs } from "file-saver";

export const downloadCSV = (data: any[]) => {
  const header = ["S/N", "Customer Name", "Total Products", "Total Amt.", "Payment", "Dues"];
  const rows = data.map((item, index) => [
    index + 1,
    item.customerName,
    item.totalProducts,
    item.totalAmt,
    item.payment,
    item.dues,
  ]);

  const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "sales_history.csv");
};

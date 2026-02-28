import { useState, useEffect } from "react";
import Card from "../components/Card";
import StatusChart from "../components/Charts/StatusChart";
import { Download, FileText } from "lucide-react";
import { supabase } from "../lib/supabase";

function Reports() {
  const [exporting, setExporting] = useState(false);

  const [total, setTotal] = useState(0);

  const [closedMonth, setClosedMonth] = useState(0);

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  /* AMBIL DATA */

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("status,created_at");

    if (error) {
      console.error(error);

      return;
    }

    /* TOTAL */

    const totalTickets = data.length;

    /* CLOSED BULAN INI */

    const now = new Date();

    const month = now.getMonth();

    const year = now.getFullYear();

    const closedThisMonth = data.filter((t) => {
      const d = new Date(t.created_at);

      return (
        t.status === "closed" &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    }).length;

    /* STATUS CHART */

    const openCount = data.filter((t) => t.status === "open").length;

    const closedCount = data.filter((t) => t.status === "closed").length;

    const chart = [
      { name: "Diproses", jumlah: openCount },

      { name: "Selesai", jumlah: closedCount },
    ];

    setTotal(totalTickets);

    setClosedMonth(closedThisMonth);

    setChartData(chart);

    setLoading(false);
  };

  /* EXPORT CSV */

  const handleExportCSV = () => {
    alert("Fitur export CSV bisa ditambahkan nanti");
  };

  /* EXPORT PDF */

  const handleExportPDF = () => {
    alert("Fitur export PDF bisa ditambahkan nanti");
  };

  if (loading) {
    return (
      <Card>
        <div className="py-10 text-center">Memuat laporan...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Laporan</h1>

        <p className="text-gray-600">Ringkasan dan ekspor laporan tiket</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Ringkasan Laporan">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Tiket</p>

                <p className="text-2xl font-bold text-gray-800">{total}</p>
              </div>

              <FileText className="text-ekajaya" size={32} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">
                  Tiket Selesai (Bulan Ini)
                </p>

                <p className="text-2xl font-bold text-gray-800">
                  {closedMonth}
                </p>
              </div>

              <FileText className="text-ekajaya" size={32} />
            </div>
          </div>
        </Card>

        <Card title="Ekspor Laporan">
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Pilih format untuk mengekspor laporan tiket
            </p>

            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Ekspor ke CSV
            </button>

            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Ekspor ke PDF
            </button>
          </div>
        </Card>
      </div>

      <Card title="Grafik Status Tiket">
        <StatusChart data={chartData} />
      </Card>
    </div>
  );
}

export default Reports;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Table from "../components/Table";
import { supabase } from "../lib/supabase";

function Archives() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select(
        `
 id,
 priority,
 status,
 created_at,
 profiles(full_name)
`
      )
      .eq("status", "closed")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const formatted = data.map((t) => ({
      id: t.id,

      reporter: t.profiles?.full_name || "User",

      priority: t.priority,

      status: t.status,

      date: t.created_at,
    }));

    setTickets(formatted);

    setLoading(false);
  };

  const columns = [
    { key: "reporter", label: "Pelapor" },

    { key: "priority", label: "Prioritas" },

    { key: "status", label: "Status" },

    {
      key: "date",
      label: "Tanggal",

      render: (value) => new Date(value).toLocaleDateString("id-ID"),
    },
  ];

  if (loading) {
    return (
      <Card>
        <div className="py-10 text-center">Memuat arsip...</div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Arsip Tiket</h2>

      <Table
        columns={columns}
        data={tickets}
        onRowClick={(row) => navigate(`/tickets/${row.id}`)}
      />
    </Card>
  );
}

export default Archives;

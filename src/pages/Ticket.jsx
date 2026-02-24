import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Table from '../components/Table'
import { supabase } from '../lib/supabase'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          id,
          title,
          priority,
          status,
          created_at,
          profiles ( full_name )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formatted = data.map((t) => ({
        id: t.id,
        reporter: t.profiles?.full_name || 'User',
        priority: t.priority,
        status: t.status,
        date: t.created_at,
      }))

      setTickets(formatted)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'reporter', label: 'Pelapor' },
    { key: 'priority', label: 'Prioritas' },
    { key: 'status', label: 'Status' },
    {
      key: 'date',
      label: 'Tanggal',
      render: (value) =>
        new Date(value).toLocaleDateString('id-ID'),
    },
  ]

  return (
    <Card>
      {loading ? (
        <div className="py-10 text-center">Memuat...</div>
      ) : (
        <Table
          columns={columns}
          data={tickets}
          onRowClick={(row) => navigate(`/tickets/${row.id}`)}
        />
      )}
    </Card>
  )
}

export default Tickets
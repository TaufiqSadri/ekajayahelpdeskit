import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    fetchTicket()
  }, [id])

  const fetchTicket = async () => {
    const { data } = await supabase
      .from('tickets')
      .select(`
        *,
        profiles ( full_name )
      `)
      .eq('id', id)
      .single()

    setTicket(data)
  }

  if (!ticket) return <div>Loading...</div>

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        {ticket.title}
      </h2>

      <p className="mb-2">
        Pelapor: {ticket.profiles?.full_name}
      </p>

      <p className="mb-2">
        Status: {ticket.status}
      </p>

      <p className="mb-2">
        Prioritas: {ticket.priority}
      </p>

      <div className="mt-4 p-3 bg-gray-50 rounded">
        {ticket.description}
      </div>
    </Card>
  )
}

export default TicketDetail
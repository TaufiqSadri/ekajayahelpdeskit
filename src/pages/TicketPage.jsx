import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { supabase } from '../lib/supabase'

function TicketPage() {
  const [tickets, setTickets] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  })

  useEffect(() => {
    fetchMyTickets()
  }, [])

  const fetchMyTickets = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    setTickets(data || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    await supabase.from('tickets').insert([
      {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        user_id: session.user.id,
        status: 'open',
      },
    ])

    setModalOpen(false)
    setFormData({ title: '', description: '', priority: 'medium' })
    fetchMyTickets()
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setModalOpen(true)}
        className="btn-primary"
      >
        Buat Tiket
      </button>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 border rounded-lg"
          >
            <h3 className="font-semibold">{ticket.title}</h3>
            <p className="text-sm text-gray-500">
              {ticket.status}
            </p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Buat Tiket"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Deskripsi"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default TicketPage
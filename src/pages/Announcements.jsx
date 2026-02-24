import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { Plus, Megaphone } from 'lucide-react'
import { supabase } from '../lib/supabase'

function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          id,
          title,
          content,
          created_at,
          profiles ( full_name )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formatted = data.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        author: item.profiles?.full_name || 'Admin',
        date: item.created_at,
      }))

      setAnnouncements(formatted)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault()

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return

    try {
      const { error } = await supabase.from('announcements').insert([
        {
          title: formData.title,
          content: formData.content,
          created_by: session.user.id,
          is_active: true,
        },
      ])

      if (error) throw error

      setModalOpen(false)
      setFormData({ title: '', content: '' })
      fetchAnnouncements()
    } catch (error) {
      console.error('Error creating announcement:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pengumuman IT
          </h1>
          <p className="text-gray-600">
            Pengumuman dan informasi penting untuk tim IT
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Tambah Pengumuman
        </button>
      </div>

      {loading ? (
        <Card>
          <div className="py-8 text-center text-gray-500">
            Memuat pengumuman...
          </div>
        </Card>
      ) : announcements.length === 0 ? (
        <Card>
          <div className="py-8 text-center text-gray-500">
            Tidak ada pengumuman
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-700 rounded-lg">
                  <Megaphone className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 mb-3 whitespace-pre-wrap">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Oleh: {announcement.author}</span>
                    <span>
                      {new Date(announcement.date).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Tambah Pengumuman"
      >
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Pengumuman
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Isi Pengumuman
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="input-field"
              rows={6}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn-secondary"
            >
              Batal
            </button>
            <button type="submit" className="btn-primary">
              Publikasikan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Announcements
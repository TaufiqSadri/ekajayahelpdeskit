import{ useState, useEffect } from 'react'
import Card from '../components/Card'
import { Search, MessageSquare, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'

function InternalDiscussion() {
  const [discussions, setDiscussions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiscussions()
  }, [])

  const fetchDiscussions = async () => {
    try {
      const { data, error } = await supabase
        .from('internal_discussions')
        .select(`
          id,
          message,
          created_at,
          profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formatted = data.map((item) => ({
        id: item.id,
        title: item.message,
        author: item.profiles?.full_name || 'Unknown',
        lastActivity: item.created_at,
      }))

      setDiscussions(formatted)
    } catch (error) {
      console.error('Error fetching discussions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Diskusi Internal
          </h1>
          <p className="text-gray-600">
            Forum diskusi internal tim IT
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Buat Diskusi Baru
        </button>
      </div>

      <Card>
        <div className="mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari diskusi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ekajaya focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-gray-500">
            Memuat diskusi...
          </div>
        ) : filteredDiscussions.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Tidak ada diskusi ditemukan
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-700 rounded-lg">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {discussion.title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      <span>Oleh: {discussion.author}</span>
                      <span className="ml-4">
                        {new Date(discussion.lastActivity).toLocaleDateString(
                          'id-ID',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default InternalDiscussion
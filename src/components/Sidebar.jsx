import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Ticket, 
  MessageSquare, 
  Megaphone, 
  FileText, 
  Settings,
  X
} from 'lucide-react'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tickets', label: 'Tiket Pengaduan', icon: Ticket },
  { path: '/announcements', label: 'Pengumuman IT', icon: Megaphone },
  { path: '/reports', label: 'Laporan', icon: FileText },
  { path: '/settings', label: 'Pengaturan', icon: Settings },
  { path: '/archives', label: 'Arsip Tiket', icon: FileText },
]

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-50 shadow-lg
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 flex items-center justify-between lg:hidden border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-2 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || 
                           (item.path !== '/' && location.pathname.startsWith(item.path))

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-ekajaya text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-ekajaya'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

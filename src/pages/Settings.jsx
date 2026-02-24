import { useState } from 'react'
import Card from '../components/Card'
import { User, Bell, Link as LinkIcon } from 'lucide-react'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: 'User',
    email: 'user@ekajaya.com',
    phone: '',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  })

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'integrations', label: 'Integrasi', icon: LinkIcon },
  ]

  const handleSaveProfile = (e) => {
    e.preventDefault()
    alert('Profil berhasil disimpan')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan</h1>
        <p className="text-gray-600">Kelola pengaturan akun dan preferensi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card className="p-0">
            <nav className="space-y-1 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${activeTab === tab.id
                        ? 'bg-ekajaya text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card title="Profil Pengguna">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button type="submit" className="btn-primary">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card title="Pengaturan Notifikasi">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Notifikasi Email</p>
                    <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ekajaya rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ekajaya"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Notifikasi Push</p>
                    <p className="text-sm text-gray-600">Terima notifikasi push di browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ekajaya rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ekajaya"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Notifikasi SMS</p>
                    <p className="text-sm text-gray-600">Terima notifikasi melalui SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ekajaya rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ekajaya"></div>
                  </label>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card title="Integrasi">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Fitur integrasi akan tersedia dalam versi mendatang.
                </p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">API Integration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Hubungkan dengan sistem eksternal melalui API
                  </p>
                  <button className="btn-secondary text-sm" disabled>
                    Segera Hadir
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings


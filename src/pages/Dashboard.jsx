import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Dashboard() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('User')
  const [role, setRole] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        navigate('/login')
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setFullName(profile.full_name)
      setRole(profile.role)
    }

    fetchProfile()
  }, [navigate])

  const statCards = [
    { title: 'Total Tiket Saya', value: '-', accent: 'from-emerald-500 to-emerald-700' },
    { title: 'Tiket Diproses', value: '-', accent: 'from-amber-400 to-amber-600' },
    { title: 'Tiket Selesai', value: '-', accent: 'from-emerald-300 to-emerald-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Header navbar sederhana */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Ekajaya Group"
            className="h-10 w-auto object-contain"
          />
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-emerald-700 uppercase">
              Ekajaya Group
            </p>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Ekajaya Group Helpdesk IT
            </h1>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Halo,</p>
          <p className="text-base font-semibold text-emerald-900">
            {fullName}
          </p>
        </div>
      </div>

      {/* Hero section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 px-6 py-8 md:px-10 md:py-10 text-emerald-50">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_50%),radial-gradient(circle_at_bottom,_#ffffff_0,_transparent_55%)]" />

        {/* Ornamen sawit di pojok kanan */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-600/20 border border-emerald-400/40 flex items-center justify-center">
          <div className="w-44 h-44 rounded-full border border-emerald-300/50 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border border-emerald-200/60 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-950 to-emerald-200 rounded-full rotate-45" />
            </div>
          </div>
        </div>

        {/* Siluet pabrik sawit */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 flex items-end gap-4 text-emerald-100 opacity-70">
          <div className="flex-1 h-20 bg-emerald-950/90 rounded-t-2xl border border-emerald-700/40 flex items-end">
            <div className="w-full grid grid-cols-6 gap-1 px-4 pb-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="h-2 rounded-sm bg-emerald-700/40" />
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="w-5 h-16 bg-emerald-950 rounded-t-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500/40 blur-xl" />
            </div>
            <div className="w-4 h-12 bg-emerald-950 rounded-t-md relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-emerald-400/40 blur-xl" />
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-medium bg-emerald-950/60 border border-emerald-500/40 rounded-full px-3 py-1 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Monitoring tiket gangguan IT
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-3">
              Pusat kendali
              <span className="block text-emerald-200">
                Helpdesk IT Ekajaya Group
              </span>
            </h2>
            <p className="text-sm text-emerald-100/80 max-w-xl mb-5">
              Pantau status tiket pengaduan Anda dan koordinasikan penyelesaian gangguan
              operasional di seluruh unit pabrik dan kantor.
            </p>
            <button
              type="button"
              onClick={() => navigate('/tickets')}
              className="inline-flex items-center justify-center rounded-xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-emerald-900 shadow-md shadow-emerald-900/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 transition-all"
            >
              Lihat Tiket Saya
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {statCards.map((card) => (
              <div
                key={card.title}
                className="relative rounded-2xl bg-white/95 shadow-sm border border-emerald-50 px-4 py-4 flex flex-col justify-between overflow-hidden"
              >
                {/* Ornamen kecil di pojok kartu */}
                <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/40" />
                <div className="absolute right-3 bottom-3 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 opacity-80" />

                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                    {card.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-emerald-50 overflow-hidden">
                  <div className={`h-full w-2/3 rounded-full bg-gradient-to-r ${card.accent}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

import {
  createBrowserRouter,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

import Login from './pages/login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tickets from "./pages/Ticket.jsx";
import TicketPage from './pages/TicketPage.jsx'
import TicketDetail from './pages/TicketDetail.jsx'
import InternalDiscussion from './pages/InternalDiscussion.jsx'
import Announcements from './pages/Announcements.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import AppLayout from './components/AppLayout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Restricted from './pages/Restricted.jsx'



const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    checkSession()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}


const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    checkSession()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}



const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role === 'admin') {
        setIsAdmin(true)
      }

      setLoading(false)
    }

    checkAdmin()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>

  if (!isAdmin) {
    return <Navigate to="/restricted" replace />
  }

  return children
}



const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true })
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-4">Halaman tidak ditemukan</p>
        <p className="text-sm text-gray-500">
          Mengarahkan ke halaman utama...
        </p>
      </div>
    </div>
  )
}

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/register',
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/restricted',
      element: <Restricted />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'tickets',
          element: <TicketPage />,
        },
        {
          path: 'tickets-admin',
          element: (
            <AdminRoute>
              <Tickets />
            </AdminRoute>
          ),
        },
        {
          path: 'tickets/:id',
          element: <TicketDetail />,
        },
        {
          path: 'discussions',
          element: (
            <AdminRoute>
              <InternalDiscussion />
            </AdminRoute>
          ),
        },
        {
          path: 'announcements',
          element: <Announcements />,
        },
        {
          path: 'reports',
          element: (
            <AdminRoute>
              <Reports />
            </AdminRoute>
          ),
        },
        {
          path: 'settings',
          element: (
            <AdminRoute>
              <Settings />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
)
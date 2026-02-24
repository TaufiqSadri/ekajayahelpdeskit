import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api.js'

function LoginCard() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="mb-6 flex justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-2xl">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="EKA JAYA GROUP Logo" 
                className="h-16 w-auto"
                onError={() => {
                  setLogoError(true)
                }}
              />
            ) : (
              <div className="h-16 w-16 flex items-center justify-center bg-ekajaya rounded-lg">
                <span className="text-white font-bold text-xl">EJ</span>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          Ekajaya Helpdesk IT
        </h1>
        <p className="text-sm text-white/80">
          Ekajaya Helpdesk IT System created by flipohariski
        </p>
      </div>

      <div className="card shadow-2xl bg-white/95 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm animate-pulse">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email / Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Masukkan email atau username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-login disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <span>Masuk</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginCard

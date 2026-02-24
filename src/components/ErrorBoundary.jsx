import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="text-red-600" size={32} />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Terjadi Kesalahan
            </h1>

            <p className="text-gray-600 mb-4">
              Maaf, terjadi kesalahan saat memuat halaman.
            </p>

            {/* VITE VERSION CHECK */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  Detail Error (Development)
                </summary>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition"
            >
              <RefreshCw size={18} />
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
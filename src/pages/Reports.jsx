import { useState } from 'react'
import Card from '../components/Card'
import StatusChart from '../components/Charts/StatusChart'
import { Download, FileText } from 'lucide-react'

function Reports() {
  const [exporting, setExporting] = useState(false)
  const [chartData] = useState([
    { name: 'Baru', jumlah: 12 },
    { name: 'Diproses', jumlah: 8 },
    { name: 'Selesai', jumlah: 25 },
  ])

  const handleExportCSV = async () => {
    setExporting(true)
    try {
      const response = await reportsAPI.exportCSV()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `laporan-tiket-${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Gagal mengekspor CSV. Silakan coba lagi.')
    } finally {
      setExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const response = await reportsAPI.exportPDF()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `laporan-tiket-${new Date().toISOString().split('T')[0]}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Gagal mengekspor PDF. Silakan coba lagi.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Laporan</h1>
        <p className="text-gray-600">Ringkasan dan ekspor laporan tiket</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Ringkasan Laporan">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Tiket</p>
                <p className="text-2xl font-bold text-gray-800">45</p>
              </div>
              <FileText className="text-ekajaya" size={32} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Tiket Selesai (Bulan Ini)</p>
                <p className="text-2xl font-bold text-gray-800">25</p>
              </div>
              <FileText className="text-ekajaya" size={32} />
            </div>
          </div>
        </Card>

        <Card title="Ekspor Laporan">
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Pilih format untuk mengekspor laporan tiket
            </p>
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download size={20} />
              {exporting ? 'Mengekspor...' : 'Ekspor ke CSV'}
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download size={20} />
              {exporting ? 'Mengekspor...' : 'Ekspor ke PDF'}
            </button>
          </div>
        </Card>
      </div>

      <Card title="Grafik Status Tiket">
        <StatusChart data={chartData} />
      </Card>
    </div>
  )
}

export default Reports


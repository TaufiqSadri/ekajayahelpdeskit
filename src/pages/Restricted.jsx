function Restricted() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Akses Terbatas
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Akses hanya untuk jaringan internal perusahaan.
          </p>
          <p className="text-xs text-gray-500">
            Silakan hubungkan perangkat Anda ke jaringan kantor Ekajaya Group
            kemudian muat ulang halaman ini.
          </p>
        </div>
      </div>
    )
  }
  
  export default Restricted
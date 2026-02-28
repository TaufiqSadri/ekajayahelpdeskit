import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password harus sama dengan password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: "user",
        },
      ]);
    }

    setLoading(false);

    if (!data.session) {
      alert("Registrasi berhasil. Silakan cek email untuk verifikasi.");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo di atas form (tengah) */}
      <header className="w-full px-6 pt-8 flex justify-center">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Ekajaya Group"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
              Ekajaya Group
            </span>
            <span className="text-sm text-gray-500">Helpdesk IT Internal</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Ornamen pabrik kelapa sawit (konsisten dengan login, namun lebih halus) */}
          <div className="hidden lg:flex relative h-[380px] rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_50%),radial-gradient(circle_at_bottom,_#ffffff_0,_transparent_55%)]" />

            {/* Siluet pabrik & daun sawit lebih minimalis */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 flex items-end gap-6 text-emerald-100">
              <div className="flex-1 h-28 bg-emerald-950/90 rounded-t-2xl border border-emerald-700/40 flex items-end">
                <div className="w-full grid grid-cols-4 gap-1 px-4 pb-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-sm bg-emerald-700/40"
                    />
                  ))}
                </div>
              </div>
              <div className="w-20 h-20 rounded-full border border-emerald-400/50 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-emerald-200/60 flex items-center justify-center">
                  <div className="w-9 h-9 bg-gradient-to-tr from-emerald-900 to-emerald-200 rounded-full rotate-45" />
                </div>
              </div>
            </div>

            <div className="relative z-10 p-8 flex flex-col gap-3 text-emerald-50">
              <p className="inline-flex items-center gap-2 text-xs font-medium bg-emerald-950/60 border border-emerald-500/40 rounded-full px-3 py-1 w-fit">
                Registrasi akun internal
              </p>
              <h1 className="text-2xl font-semibold leading-snug">
                Daftarkan akun helpdesk IT
                <span className="block text-emerald-200 text-base mt-1">
                  untuk mengelola tiket dan gangguan operasional
                </span>
              </h1>
              <p className="text-xs text-emerald-100/80 max-w-md">
                Data registrasi hanya digunakan untuk keperluan identifikasi
                pengguna di lingkungan internal Ekajaya Group.
              </p>
            </div>
          </div>

          {/* Form register */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-lg shadow-emerald-900/5 px-8 py-8 sm:px-10 sm:py-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Buat Akun Helpdesk
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Isi data di bawah ini untuk mengaktifkan akses ke sistem
                helpdesk IT.
              </p>

              {error && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                    placeholder="Nama lengkap sesuai identitas"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Perusahaan
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                    placeholder="nama@ekajaya.co.id"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kata Sandi
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                    placeholder="Minimal 6 karakter"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                    placeholder="Ulangi kata sandi"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#145A32] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 transition-all"
                >
                  {loading ? "Memproses..." : "Daftar Sekarang"}
                </button>
              </form>

              <p className="mt-6 text-xs text-gray-500 text-center">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  Masuk ke helpdesk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;

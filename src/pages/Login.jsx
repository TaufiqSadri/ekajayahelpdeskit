import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate("/dashboard");
    setLoading(false);
  };
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo di kiri atas */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-6 flex items-center gap-3">
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
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Ilustrasi pabrik kelapa sawit */}
          <div className="hidden lg:flex relative h-[420px] rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_50%),radial-gradient(circle_at_bottom,_#ffffff_0,_transparent_55%)]" />

            {/* Siluet pabrik sawit */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 flex items-end gap-6 text-emerald-100">
              {/* Cerobong pabrik */}
              <div className="flex items-end gap-3">
                <div className="w-6 h-28 bg-emerald-950 rounded-t-md relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-emerald-600/30 blur-xl" />
                </div>
                <div className="w-4 h-20 bg-emerald-950 rounded-t-md relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-emerald-500/30 blur-xl" />
                </div>
              </div>

              {/* Bangunan pabrik */}
              <div className="flex-1 flex items-end gap-4">
                <div className="flex-1 h-32 bg-emerald-950/90 rounded-t-2xl border border-emerald-700/40 flex items-end">
                  <div className="w-full grid grid-cols-5 gap-1 px-4 pb-4">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-3 rounded-sm bg-emerald-700/40"
                      />
                    ))}
                  </div>
                </div>
                <div className="w-24 h-20 bg-emerald-950/90 rounded-t-xl border border-emerald-700/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600/70 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ikon daun kelapa sawit */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-600/20 border border-emerald-400/40 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-emerald-300/40 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border border-emerald-200/60 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/90 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gradient-to-tr from-emerald-900 to-emerald-200 rounded-full rotate-45" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 p-10 flex flex-col gap-4 text-emerald-50">
              <p className="inline-flex items-center gap-2 text-xs font-medium bg-emerald-950/60 border border-emerald-500/40 rounded-full px-3 py-1 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sistem Helpdesk IT Terintegrasi
              </p>
              <h1 className="text-3xl font-semibold leading-tight">
                Kelola tiket
                <span className="block text-emerald-200">
                  gangguan IT internal Ekajaya
                </span>
              </h1>
              <p className="text-sm text-emerald-100/80 max-w-md">
                Akses hanya untuk karyawan Ekajaya Group di jaringan internal.
                Laporkan kendala IT Anda dan pantau progres penyelesaiannya
                dalam satu dashboard.
              </p>
            </div>
          </div>

          {/* Form login */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-lg shadow-emerald-900/5 px-8 py-8 sm:px-10 sm:py-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Masuk ke Helpdesk
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Gunakan akun email perusahaan Anda untuk mengakses sistem.
              </p>

              {error && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                    placeholder="Masukkan kata sandi"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#145A32] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 transition-all"
                >
                  {loading ? "Memproses..." : "Masuk Sekarang"}
                </button>
              </form>

              <div className="mt-4">
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="px-3 text-xs text-gray-400">atau</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
              </div>

              <p className="mt-6 text-xs text-gray-500 text-center">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  Daftar akses helpdesk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;

function NotifToast({ notif }) {
  if (!notif) return null;

  const baseClasses =
    "fixed top-4 right-4 z-50 max-w-sm w-full rounded-xl shadow-lg border px-4 py-3 text-sm flex items-start gap-3 transition-transform transform";

  const colorClasses =
    notif.type === "success"
      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
      : "bg-red-50 border-red-200 text-red-900";

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <div className="mt-0.5">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            notif.type === "success" ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold mb-0.5">
          {notif.type === "success" ? "Berhasil" : "Gagal"}
        </p>
        <p className="text-xs text-gray-700">{notif.message}</p>
      </div>
    </div>
  );
}

export default NotifToast;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Camera } from "lucide-react";

type User = {
  user_id?: string | null;
  username?: string | null;
  avatar?: string | null;
};

interface props {
  user: User;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    username?: string | null;
    avatarFile?: File | null;
  }) => void;
  onDelete: () => void;
}

export default function Editor({
  user,
  onClose,
  loading,
  onSave,
  onDelete,
}: props) {
  const [username, setUsername] = useState(user.username ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.avatar ?? null,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (avatarFile) URL.revokeObjectURL(avatarUrl ?? "");
    };
  }, [avatarFile, avatarUrl]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (file) setAvatarUrl(URL.createObjectURL(file));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative w-11/12 max-w-lg bg-white backdrop-blur-sm rounded-lg px-6 py-4">
        <h3 className="text-lg font-semibold">Edit Profile</h3>
        <button
          className="absolute top-1.5 right-0 px-4 py-2 bg-transparent text-sm hover:scale-110 active:scale-95 transition-transform"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-4 items-center pt-4 pb-12">
          <label className="group relative w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-white/10 cursor-pointer block">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar preview"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/3 flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-12 h-12 text-white" />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </label>

          <div className="flex-1">
            <label className="block text-sm text-slate-800 font-bold">
              Username
            </label>
            <input
              className="w-full bg-transparent border-2 border-card-border rounded-md px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your display name"
            />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 flex justify-between items-center w-full px-6 py-2 bg-accent-color/10 border-t border-white rounded-b-lg">
          <button
            className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            disabled={loading}
            onClick={() => onDelete()}
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
            ) : (
              <span>Delete My Account</span>
            )}
          </button>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-card-border bg-primary-bg px-4 py-3 font-semibold text-primary text-sm transition hover:bg-card-bg-hover"
            disabled={loading}
            onClick={() => onSave({ username: username || null, avatarFile })}
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

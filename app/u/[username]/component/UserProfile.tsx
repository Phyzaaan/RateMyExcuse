"use client";

import Image from "next/image";
import { useState } from "react";
import getSafeAvatar from "@/app/utils/libs/getSafeAvatar";
import { Pencil } from "lucide-react";
import Editor from "./Editor";
import ToastMessage from "@/app/components/ToastMessage";
import { Toast, UserData } from "@/app/data/type";
import {
  deleteUserProfile,
  updateUserProfile,
} from "@/app/utils/libs/supabaseClient";
import { redirect } from "next/navigation";

export default function UserProfile({
  user,
  isOwner,
}: {
  user: UserData;
  isOwner: boolean;
}) {
  const avatar = getSafeAvatar(user.avatar ?? undefined);
  const [open, setOpen] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const [toast, setToast] = useState<Toast | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async ({
    username,
    avatarFile,
  }: {
    username?: string | null | undefined;
    avatarFile?: File | null | undefined;
  }) => {
    if (loading) {
      return;
    } else if (!username && !avatarFile) {
      setToast({
        message: "Everything is up to date",
        success: true,
      });
      return;
    }

    setLoading(true);

    let avatarUrl: string | undefined = undefined;

    if (avatarFile) {
      const formData = new FormData();
      formData.append("file", avatarFile);

      const res = await fetch("/api/uploadAvatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        setToast({
          message: data.error,
          success: false,
        });
        return;
      }
      avatarUrl = data.publicUrl;
    }

    const error = await updateUserProfile(username ?? undefined, avatarUrl);
    if (error) {
      setToast({
        message: error,
        success: false,
      });
      return;
    }

    setLocalUser((prev) => ({
      ...prev,
      username: username ?? prev.username,
      avatar: avatarUrl ?? prev.avatar,
    }));

    setToast({
      message: "All changes are saved successfully",
      success: true,
    });

    setLoading(false);
  };

  const handleDelete = async () => {
    if (loading || !user.user_id) return;
    const confirm = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone.",
    );
    if (!confirm) return;
    setLoading(true);
    
    const error = await deleteUserProfile(user.user_id);
    if (error) {
      setToast({
        message: error,
        success: false,
      });
      return;
    }

    setToast({
      message: "Your profile is deleted!",
      success: true,
    });
    setLoading(false);
    redirect("/")
  };

  return (
    <>
      <section className="relative w-full max-w-5xl mx-auto glass-panel rounded-xl py-6 px-4 shadow-sm">
        <div className="flex items-center gap-6">
          <Image
            src={avatar}
            alt={`${localUser.username ?? "User"} avatar`}
            width={112}
            height={112}
            className="w-28 h-28 rounded-full object-cover border-2 border-white/10"
          />

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold">
                {localUser.username}
              </h1>
              {isOwner && (
                <button
                  className="absolute top-3 right-2 px-2 py-1 text-sm rounded-full group transition-colors"
                  onClick={() => setOpen(true)}
                >
                  <Pencil className="w-4 h-4 group-hover:scale-110 active:scale-90 transition-all" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600/20 rounded-full text-sm">
                {localUser.is_premium ? "Premium" : "Free"}
              </span>
              <span className="text-sm text-slate-400">
                Highest: {localUser.highest_score ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="p-4 bg-white/3 rounded-lg text-center">
            <div className="text-3xl font-extrabold">
              {localUser.games_played ?? 0}
            </div>
            <div className="text-sm text-slate-400">Games Played</div>
          </div>

          <div className="p-4 bg-white/3 rounded-lg text-center">
            <div className="text-3xl font-extrabold">
              {localUser.games_remaining ?? 0}
            </div>
            <div className="text-sm text-slate-400">Games Remaining</div>
          </div>

          <div className="p-4 bg-white/3 rounded-lg text-center">
            <div className="text-3xl font-extrabold">
              {localUser.is_premium ? "✓" : "—"}
            </div>
            <div className="text-sm text-slate-400">Premium</div>
          </div>

          <div className="p-4 bg-white/3 rounded-lg text-center">
            <div className="text-3xl font-extrabold">
              {localUser.highest_score ?? 0}
            </div>
            <div className="text-sm text-slate-400">Highest Score</div>
          </div>
        </div>

        {open && isOwner && (
          <Editor
            user={localUser}
            onClose={() => setOpen(false)}
            loading={loading}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </section>
      {toast && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

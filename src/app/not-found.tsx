"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BorderBeamButton } from "@/components/ui/border-beam-button";

export default function NotFound() {
  const router = useRouter();
  const [path, setPath] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [button, setButton] = useState<string>("");

  const roulette = [
    {
      title: "Halaman ini sedang mencari jati diri.",
      description:
        "Sepertinya halaman yang kamu cari lagi overthinking dan memilih menghilang sementara.",
      button: "Balik aja dulu",
    },
    {
      title: "404: Hubungan tidak ditemukan.",
      description:
        "Mirip chat yang cuma dibaca doang — halaman ini nggak pernah bales.",
      button: "Move on",
    },
    {
      title: "Tersesat di semesta digital.",
      description:
        "Halaman ini mungkin nyasar ke timeline orang lain atau tenggelam di internet.",
      button: "Pulang",
    },
    {
      title: "Ada yang hilang.",
      description:
        "Bukan cuma perasaan dia ke kamu, tapi halaman ini juga ikut menghilang.",
      button: "Ikhlaskan",
    },
    {
      title: "Oops, kepeleset.",
      description:
        "Kayaknya link yang kamu klik habis nabrak realita dan jatuh ke jurang 404.",
      button: "Coba lagi",
    },
    {
      title: "Halamannya kabur.",
      description:
        "Mungkin dia capek terus dicari-cari, jadi memutuskan pergi tanpa pamit.",
      button: "Cari yang lain",
    },
    {
      title: "Tidak semua yang dicari bisa ditemukan.",
      description: "Contohnya halaman ini... dan kepastian dari dia.",
      button: "Sad banget",
    },
    {
      title: "Servernya lagi galau.",
      description:
        "Dia bilang halaman ini ada, tapi pas dicari malah ghosting.",
      button: "Yaudah deh",
    },
    {
      title: "Lost in the crowd.",
      description:
        "Halaman yang kamu cari tenggelam di antara milyaran byte internet.",
      button: "Back home",
    },
    {
      title: "Ada glitch di dunia nyata.",
      description:
        "Mungkin kamu terlalu cepat, mungkin semestanya belum siap mempertemukan kalian.",
      button: "Reset timeline",
    },
    {
      title: "Kamu nyasar bro.",
      description:
        "Antara link-nya salah, atau takdir memang nggak merestui halaman ini muncul.",
      button: "Balik kanan",
    },
    {
      title: "Page not found, hati juga.",
      description: "Yang satu hilang di server, yang satu hilang arah.",
      button: "Peluk aku",
    },
    {
      title: "Halaman ini sedang healing.",
      description:
        "Setelah terlalu sering dibuka tanpa kepastian, dia memilih menyendiri.",
      button: "Kasih waktu",
    },
    {
      title: "404 dulu nggak sih?",
      description: "Halaman ini menghilang demi kesehatan mentalnya.",
      button: "Respect",
    },
    {
      title: "Tidak ditemukan.",
      description:
        "Kayak tugas kelompok pas hari presentasi — tiba-tiba semua menghilang.",
      button: "Panik",
    },
    {
      title: "Koneksi dengan kenyataan terputus.",
      description: "Halaman ini mungkin lagi rebahan di dimensi lain.",
      button: "Teleport",
    },
    {
      title: "Yah ketahuan.",
      description: "Kamu masuk ke tempat yang seharusnya nggak ada.",
      button: "Kabur",
    },
    {
      title: "Halamannya pensiun.",
      description: "Dia sudah lelah memenuhi ekspektasi user.",
      button: "Terima kasih",
    },
    {
      title: "404.",
      description: "Singkat, padat, menyakitkan.",
      button: "Nangis",
    },
    {
      title: "Dunia memang penuh misteri.",
      description: "Salah satunya: ke mana perginya halaman ini?",
      button: "Investigasi",
    },
  ];

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const idx = Math.floor(Math.random() * roulette.length);
    setTitle(roulette[idx].title);
    setDescription(roulette[idx].description);
    setButton(roulette[idx].button);
  }, [roulette]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[linear-gradient(to_top,#2D4059_25%,#EA5455_50%,#F07B3F_75%,#FFD460_100%)]">
      <div className="absolute inset-x-0 bottom-0 h-full w-full">
        <CrowdCanvas src="/images/all-peeps.png" rows={15} cols={7} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-cust-black/40" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 aspect-square h-2/3 bg-cust-black/70 rounded-full blur-2xl" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center space-y-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-cust-yellow">
          Error 404
        </p>

        <div className="relative select-none leading-none">
          <h1 className="relative text-9xl font-black leading-none text-white">
            404
          </h1>
        </div>

        <h2 className="text-4xl font-black text-white">{title}</h2>

        <p className="max-w-90 text-lg leading-relaxed text-white font-medium">
          {description}
        </p>

        <BorderBeamButton onClick={() => router.push("/")}>
          {button}
        </BorderBeamButton>
      </div>
    </main>
  );
}

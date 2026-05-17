"use client";

import { useEffect, useState } from "react";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import { useRouter } from "next/navigation";
import { BorderBeamButton } from "@/components/ui/border-beam-button";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [primaryButton, setPrimaryButton] = useState<string>("");
  const [secondaryButton, setSecondaryButton] = useState<string>("");

  const roulette = [
    {
      title: "Aduh, ada yang salah nih.",
      description:
        "Sistemnya lagi panik dan nggak tau harus ngapain. Sama kayak kita pas ujian mendadak.",
      primary: "Coba lagi",
      secondary: "Kabur ke beranda",
    },
    {
      title: "Servernya lagi drama.",
      description:
        "Ada error yang muncul tiba-tiba tanpa permisi. Kayak mantan yang tiba-tiba chat.",
      primary: "Reset ulang",
      secondary: "Pulang aja",
    },
    {
      title: "Glitch ditemukan.",
      description:
        "Semesta digital lagi ngambek. Coba tunggu bentar atau minta dia baikan duluan.",
      primary: "Sabar, coba lagi",
      secondary: "Mending balik",
    },
    {
      title: "Terjadi gangguan tak terduga.",
      description:
        "Halaman ini udah usaha keras, tapi tetap aja jatuh. Relate banget nggak sih?",
      primary: "Bangunin lagi",
      secondary: "Ke beranda",
    },
    {
      title: "Error misterius muncul.",
      description:
        "Kode-kodenya lagi bingung sama hidupnya sendiri. Butuh waktu buat beneran.",
      primary: "Coba sekali lagi",
      secondary: "Menyerah dulu",
    },
    {
      title: "Aduh, kepeleset bug.",
      description:
        "Programmer-nya juga manusia, kadang ada yang kelewat. Semoga reload bisa bantu.",
      primary: "Reload",
      secondary: "Balik ke awal",
    },
    {
      title: "Koneksi jiwa terputus.",
      description:
        "Antara kamu dan halaman ini ada jarak yang tak bisa dijangkau saat ini.",
      primary: "Sambung lagi",
      secondary: "Ikhlasin",
    },
    {
      title: "Sistemnya lagi healing.",
      description:
        "Setelah terlalu keras bekerja, dia butuh sebentar buat recovery.",
      primary: "Kasih waktu, coba lagi",
      secondary: "Nurut aja, balik",
    },
  ];

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    const idx = Math.floor(Math.random() * roulette.length);
    setTitle(roulette[idx].title);
    setDescription(roulette[idx].description);
    setPrimaryButton(roulette[idx].primary);
    setSecondaryButton(roulette[idx].secondary);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[linear-gradient(to_top,#2D4059_25%,#EA5455_50%,#F07B3F_75%,#FFD460_100%)]">
      <div className="absolute inset-x-0 bottom-0 h-full w-full">
        <CrowdCanvas src="/images/all-peeps.png" rows={15} cols={7} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-cust-black/40" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 aspect-square h-2/3 bg-cust-black/70 rounded-full blur-2xl" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center space-y-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-cust-yellow">
          Terjadi Kesalahan
        </p>

        <div className="relative select-none leading-none">
          <h1 className="relative text-9xl font-black leading-none text-white">
            Error
          </h1>
        </div>

        <h2 className="text-4xl font-black text-white">{title}</h2>

        <p className="max-w-90 text-lg leading-relaxed text-white font-medium">
          {description}
        </p>

        <p className="bg-red-500/50 text-white px-4 py-2 rounded text-sm font-medium">
          {error.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <BorderBeamButton onClick={() => reset()}>
            {primaryButton}
          </BorderBeamButton>

          <Button
            variant={"outline"}
            onClick={() => router.push("/")}
            className=""
          >
            {secondaryButton}
          </Button>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { animate, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedStatProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  title: string;
}

const AnimatedStat = ({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
  title,
}: AnimatedStatProps) => {
  const [displayValue, setDisplayValue] = useState(from);
  const count = useMotionValue(from);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      animate(count, to, {
        duration,
        ease: "easeInOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
    } else {
      count.set(from);
      setDisplayValue(from);
    }
  }, [inView, count, from, to, duration]);

  return (
    <div className="text-center">
      <div ref={ref} className="text-4xl font-black text-cust-red">
        <NumberFlow value={displayValue} prefix={prefix} suffix={suffix} />
      </div>
      <p className="mt-1 text-sm text-gray-500">{title}</p>
    </div>
  );
};

const Stats = () => {
  const stats = [
    {
      title: "Pengguna Aktif",
      to: 50,
      suffix: "K+",
    },
    {
      title: "Paket Tersedia",
      to: 8,
      suffix: "+",
    },
    {
      title: "Transaksi/Hari",
      to: 5,
      suffix: "K+",
    },
    {
      title: "Kepuasan Pelanggan",
      to: 98,
      suffix: "%",
    },
  ];

  return (
    <section className="bg-cust-yellow py-10 drop-shadow-2xl">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((item) => (
            <AnimatedStat key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturesProps {
  features: {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }[];
}

const Features = ({ features }: FeaturesProps) => {
  return (
    <section className="bg-cust-dark-blue py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-cust-yellow">Kenapa Pilih DataPaket.id?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Card
              key={i}
              className="group text-center h-full bg-cust-red border-white/10 hover:scale-105 hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
            >
              <CardContent className="p-6">
                <div className="mb-3 text-white">{f.icon}</div>
                <h5 className="text-white font-semibold text-base mb-2">{f.title}</h5>
                <p className="text-white text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
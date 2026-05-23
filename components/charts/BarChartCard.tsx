"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartDatum } from "@/data/articles";

type BarChartCardProps = {
  data: ChartDatum[];
};

export function BarChartCard({ data }: BarChartCardProps) {
  return (
    <div className="glass-card h-80 rounded-[1.5rem] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94A3B8" }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#94A3B8" }} />
          <Tooltip />
          <Bar dataKey="score" fill="#22D3EE" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

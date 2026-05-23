"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import type { ChartDatum } from "@/data/articles";

type RadarChartCardProps = {
  data: ChartDatum[];
};

export function RadarChartCard({ data }: RadarChartCardProps) {
  return (
    <div className="glass-card h-80 rounded-[1.5rem] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(148,163,184,0.24)" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 12, fill: "#94A3B8" }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <Tooltip />
          <Radar dataKey="value" stroke="#38BDF8" fill="#A855F7" fillOpacity={0.38} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

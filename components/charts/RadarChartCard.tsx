"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import type { ChartDatum } from "@/data/articles";

type RadarChartCardProps = {
  data: ChartDatum[];
};

export function RadarChartCard({ data }: RadarChartCardProps) {
  return (
    <div className="h-80 rounded-[1.5rem] border border-slate-900/10 bg-white p-4 shadow-soft">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#d9dee8" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Radar dataKey="value" stroke="#12233d" fill="#f3d9a4" fillOpacity={0.68} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

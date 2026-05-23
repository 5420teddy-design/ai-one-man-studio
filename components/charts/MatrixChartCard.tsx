"use client";

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import type { ChartDatum } from "@/data/articles";

type MatrixChartCardProps = {
  data: ChartDatum[];
};

export function MatrixChartCard({ data }: MatrixChartCardProps) {
  return (
    <div className="glass-card h-80 rounded-[1.5rem] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
          <XAxis
            type="number"
            dataKey="difficulty"
            name="學習難度"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#94A3B8" }}
          />
          <YAxis type="number" dataKey="speed" name="變現速度" domain={[0, 100]} tick={{ fontSize: 12, fill: "#94A3B8" }} />
          <ZAxis type="number" dataKey="longTerm" range={[120, 520]} name="長期價值" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="商業價值矩陣" data={data} fill="#38BDF8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

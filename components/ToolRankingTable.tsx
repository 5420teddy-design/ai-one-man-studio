"use client";

import { useMemo, useState } from "react";
import { ArrowDownAZ, ExternalLink, SlidersHorizontal } from "lucide-react";
import type { Tool } from "@/data/tools";
import { sortByScore } from "@/lib/utils";

type ToolRankingTableProps = {
  tools: Tool[];
};

export function ToolRankingTable({ tools }: ToolRankingTableProps) {
  const categories = useMemo(() => ["全部", ...Array.from(new Set(tools.map((tool) => tool.category)))], [tools]);
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredTools = useMemo(() => {
    const filtered = activeCategory === "全部" ? tools : tools.filter((tool) => tool.category === activeCategory);
    return sortByScore(filtered);
  }, [activeCategory, tools]);

  return (
    <div className="glass-card rounded-[1.5rem] p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyber-cyan">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            分類篩選
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-cyber-title">AI 工具排行榜</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category ? "bg-cyber-cyan text-cyber-bg" : "bg-white/5 text-cyber-muted hover:text-cyber-title"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-cyber-muted">
            <tr>
              <th className="px-4">工具</th>
              <th className="px-4">分類</th>
              <th className="px-4">適合用途</th>
              <th className="px-4">價格</th>
              <th className="px-4">難度</th>
              <th className="px-4">商業價值</th>
              <th className="px-4">
                <span className="inline-flex items-center gap-1">
                  分數
                  <ArrowDownAZ className="h-4 w-4" aria-hidden="true" />
                </span>
              </th>
              <th className="px-4">連結</th>
            </tr>
          </thead>
          <tbody>
            {filteredTools.map((tool) => (
              <tr key={tool.name} className="bg-white/[0.04] shadow-sm">
                <td className="rounded-l-2xl px-4 py-4 font-bold text-cyber-title">{tool.name}</td>
                <td className="px-4 py-4 text-cyber-muted">{tool.category}</td>
                <td className="max-w-xs px-4 py-4 text-cyber-muted">{tool.bestFor}</td>
                <td className="px-4 py-4 text-cyber-muted">{tool.pricing}</td>
                <td className="px-4 py-4 text-cyber-muted">{tool.difficulty}/5</td>
                <td className="px-4 py-4 text-cyber-muted">{tool.businessValue}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-cyber-cyan/10 px-3 py-1 font-bold text-cyber-cyan">{tool.score}</span>
                </td>
                <td className="rounded-r-2xl px-4 py-4">
                  <a
                    href={tool.affiliateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-cyber-cyan hover:text-white"
                  >
                    官方網站
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

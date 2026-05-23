import { ExternalLink } from "lucide-react";
import type { Tool } from "@/data/tools";

export function ToolAffiliateCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.affiliateUrl}
      target="_blank"
      rel="noreferrer"
      className="group gradient-border rounded-3xl p-px transition hover:-translate-y-1"
    >
      <div className="h-full rounded-[1.45rem] bg-cyber-panel/95 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyber-cyan">{tool.category}</p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-cyber-title group-hover:text-cyber-cyan">
              {tool.name}
            </h3>
          </div>
          <ExternalLink className="h-5 w-5 text-cyber-muted group-hover:text-cyber-cyan" aria-hidden="true" />
        </div>
        <p className="mt-4 min-h-14 text-sm leading-7 text-cyber-muted">{tool.description}</p>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
          <span className="text-cyber-muted">{tool.bestFor}</span>
          <span className="font-display text-xl font-black text-cyber-cyan">{tool.score}</span>
        </div>
      </div>
    </a>
  );
}

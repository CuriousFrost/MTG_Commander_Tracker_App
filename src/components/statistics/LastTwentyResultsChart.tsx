import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecentResultPoint } from "@/lib/stats";

interface LastTwentyResultsChartProps {
  data: RecentResultPoint[];
}

function computeCurrentStreak(data: RecentResultPoint[]) {
  if (data.length === 0) return "--";

  let streak = 0;
  const latestWon = data[data.length - 1].won;

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].won !== latestWon) break;
    streak++;
  }

  return `${streak}${latestWon ? "W" : "L"}`;
}

export function LastTwentyResultsChart({ data }: LastTwentyResultsChartProps) {
  const wins = useMemo(() => data.filter((point) => point.won).length, [data]);
  const losses = data.length - wins;
  const streak = computeCurrentStreak(data);
  const recentWinRate = data.length > 0 ? Math.round((wins / data.length) * 100) : 0;

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>20-Game Glimpse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No game data yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>20-Game Glimpse</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
          <div className="rounded-md border p-2">
            <p className="text-muted-foreground">Record</p>
            <p className="text-sm font-semibold">
              {wins}W - {losses}L
            </p>
          </div>
          <div className="rounded-md border p-2">
            <p className="text-muted-foreground">Win Rate</p>
            <p className="text-sm font-semibold">{recentWinRate}%</p>
          </div>
          <div className="rounded-md border p-2">
            <p className="text-muted-foreground">Current Streak</p>
            <p className="text-sm font-semibold">{streak}</p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Oldest</span>
            <span>Newest</span>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {data.map((point, index) => (
              <div
                key={`${point.game}-${point.date}-${index}`}
                title={`Game ${index + 1}: ${point.outcome === "W" ? "Win" : "Loss"} - ${point.deckName} (${point.date})`}
                className={`flex h-9 items-center justify-center rounded-md border text-xs font-bold ${
                  point.won
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                    : "border-rose-500/40 bg-rose-500/20 text-rose-300"
                }`}
              >
                {point.outcome}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

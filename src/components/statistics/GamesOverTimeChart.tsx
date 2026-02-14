import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import type { MonthlyStat } from "@/lib/stats";

interface GamesOverTimeChartProps {
  data: MonthlyStat[];
}

const chartConfig = {
  wins: { label: "Wins", color: "var(--chart-2)" },
  losses: { label: "Losses", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function GamesOverTimeChart({ data }: GamesOverTimeChartProps) {
  const isMobile = useIsMobile();

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Annual Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No game data yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[250px] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              minTickGap={isMobile ? 20 : 8}
              interval={isMobile ? "preserveStartEnd" : 0}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="wins"
              stackId="games"
              fill="var(--color-wins)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="losses"
              stackId="games"
              fill="var(--color-losses)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

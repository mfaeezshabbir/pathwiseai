import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export function LearningActivity({ activity }: { activity: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Activity</CardTitle>
        <CardDescription>Modules completed per month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            modules: {
              label: "Modules",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-64 w-full"
        >
          <RechartsBarChart
            data={activity}
            margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="modules"
              fill="var(--color-modules)"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

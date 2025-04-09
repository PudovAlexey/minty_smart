import { cn } from "@shared/lib/utils/cn"
import { Card } from "@shared/ui/Card/Card"
import { CardContent } from "@shared/ui/Card/CardContent"
import { ChartContainer } from "@shared/ui/ChartContainer/ChartContainer"
import { Line, LineChart } from 'recharts'

export type TokenChartProps = {
    chart: number[]
    change: number
    bgFrom?: string
}

function TokenChart({
    change,
    chart,
    bgFrom = 'from-background',
}: TokenChartProps) {
    const chartConfig = {
        v: {
            color: `hsl(var(--${change > 0 ? 'positive' : 'negative'}))`,
        },
    }

    const chartData = chart.map((v) => ({ v }))

    return (
        <Card className="bg-transparent">
            <CardContent className="w-16 relative">
                <div
                    className={cn(
                        'absolute left-0 top-0 w-full h-full bg-gradient-to-r from-5% to-40% z-50',
                        bgFrom,
                    )}
                />
                <ChartContainer config={chartConfig} className="">
                    <LineChart accessibilityLayer data={chartData} className="relative">
                        <Line
                            dataKey="v"
                            type="natural"
                            stroke="var(--color-v)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export {
    TokenChart
}
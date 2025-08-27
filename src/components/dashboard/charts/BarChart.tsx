// src/components/dashboard/charts/BarChart.tsx
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: { name: string; value: number }[];
  barColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, barColor = "#4f46e5" }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ReBarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  name: string;
  value: number;
}

interface StatusPieChartProps {
  data: ChartData[];
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const StatusPieChart: React.FC<StatusPieChartProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return <div>Loading Chart...</div>
    }
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            >
              {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatusPieChart;
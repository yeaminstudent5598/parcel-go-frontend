/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any; 
}

interface StatusPieChartProps {
  data: ChartData[];
  isLoading: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatusPieChart: React.FC<StatusPieChartProps> = ({ data, isLoading }) => {
  
  if (isLoading) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-48 rounded-md" />
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[300px]">
          <Skeleton className="h-48 w-48 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader><CardTitle>Parcel Status Distribution</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-slate-400 font-medium text-sm italic">
          No data available for chart.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-lg bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Parcel Status Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                // ✅ সমাধান: percent ?? 0 ব্যবহার করা হয়েছে যাতে undefined হলেও সমস্যা না হয়
                label={({ name, percent }) => {
                  const safePercent = percent ?? 0;
                  return safePercent > 0 
                    ? `${name} ${(safePercent * 100).toFixed(0)}%` 
                    : '';
                }}
              >
                {data.map((_entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity outline-none"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusPieChart;
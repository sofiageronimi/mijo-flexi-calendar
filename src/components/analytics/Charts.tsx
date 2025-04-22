
import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Legend,
  CartesianGrid,
  PieLabel,
} from 'recharts';

// Common palette for visual consistency
const COLORS = ['#FF6B35', '#004E98', '#1A659E', '#7FB069', '#EBEBEB', '#F7C59F', '#B5BAD0'];

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface LineChartProps {
  data: {
    date: string;
    value: number;
    [key: string]: any;
  }[];
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip 
          wrapperStyle={{ outline: 'none' }}
          contentStyle={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
            border: 'none',
            padding: '10px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#004E98" 
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        {Object.keys(data[0] || {}).filter(key => key !== 'date' && key !== 'value').map((key, index) => (
          <Line 
            key={key}
            type="monotone" 
            dataKey={key} 
            stroke={COLORS[index % COLORS.length]} 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        ))}
        <Legend />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

interface BarChartProps {
  data: ChartData[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip 
          wrapperStyle={{ outline: 'none' }}
          contentStyle={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
            border: 'none',
            padding: '10px'
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
        {Object.keys(data[0] || {}).filter(key => key !== 'name' && key !== 'value').map((key, index) => (
          <Bar 
            key={key}
            dataKey={key} 
            radius={[4, 4, 0, 0]}
            fill={COLORS[(index + 1) % COLORS.length]} 
          />
        ))}
        <Legend />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface PieChartComponentProps {
  data: ChartData[];
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          wrapperStyle={{ outline: 'none' }}
          contentStyle={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
            border: 'none',
            padding: '10px'
          }}
          formatter={(value, name) => {
            const total = data.reduce((acc, item) => acc + item.value, 0);
            const percentage = ((Number(value) / total) * 100).toFixed(1);
            return [`${value} (${percentage}%)`, name];
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

interface FunnelChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ data }) => {
  // Creating a custom funnel visualization using bars
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <div className="w-full">
      {sortedData.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{item.name}</span>
            <span>{item.value}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4">
            <div 
              className="bg-mijob-blue h-4 rounded-full" 
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

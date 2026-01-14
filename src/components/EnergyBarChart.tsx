
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { 
  NameType, 
  ValueType 
} from 'recharts/types/component/DefaultTooltipContent';

interface EnergyData {
  name: string;
  value: number;
  unit: string;
}

interface EnergyBarChartProps {
  data: EnergyData[];
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as EnergyData;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-blue-600 font-bold">
          {data.value} {data.unit}
        </p>
      </div>
    );
  }
  return null;
};

const EnergyBarChart: React.FC<EnergyBarChartProps> = ({ data, height = 300 }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis 
            hide={true}
            domain={[0, 'dataMax + 100']}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
          />
          <Bar 
            dataKey="value" 
            fill="#4285F4" 
            radius={[4, 4, 0, 0]}
            onMouseOver={(data) => setHoveredBar(data.name)}
            onMouseOut={() => setHoveredBar(null)}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-12 gap-1 text-xs text-center mt-1">
        {data.map(item => (
          <div key={item.name} className="col-span-1">
            <div className="text-gray-600 mb-1">{item.name}</div>
            <div className="text-gray-800 font-medium">{item.value} {item.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyBarChart;

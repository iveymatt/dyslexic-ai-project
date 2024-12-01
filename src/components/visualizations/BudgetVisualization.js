import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function BudgetVisualization() {
  const budgetData = [
    { name: 'Development & Engineering', value: 170000, color: '#f80f90' },
    { name: 'Infrastructure & Cloud', value: 100000, color: '#00cbff' },
    { name: 'Research & Testing', value: 70000, color: '#8844ee' },
    { name: 'Operations', value: 40000, color: '#44aadd' },
    { name: 'Marketing & Outreach', value: 20000, color: '#ee7744' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 style={{color: '#f80f90'}} className="text-2xl font-bold mb-6">Budget Allocation</h2>
      
      <div className="flex flex-col lg:flex-row items-center justify-around">
        <PieChart width={400} height={400}>
          <Pie
            data={budgetData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {budgetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 style={{color: '#00cbff'}} className="text-lg font-bold mb-4">Budget Breakdown</h3>
          {budgetData.map((item, index) => (
            <div key={index} className="mb-2 text-white">
              <span className="font-bold">{item.name}:</span> ${item.value.toLocaleString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

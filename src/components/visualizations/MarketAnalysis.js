import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function MarketAnalysis() {
  const marketData = [
    { name: 'North America', dyslexicPopulation: 45, marketPotential: 85 },
    { name: 'Europe', dyslexicPopulation: 40, marketPotential: 75 },
    { name: 'Asia', dyslexicPopulation: 55, marketPotential: 90 },
    { name: 'Other Regions', dyslexicPopulation: 35, marketPotential: 65 }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 style={{color: '#f80f90'}} className="text-2xl font-bold mb-4">
          Market Potential by Region
        </h2>
        <div className="bg-gray-900 p-4 rounded-lg">
          <BarChart width={600} height={300} data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="dyslexicPopulation" fill="#f80f90" name="Dyslexic Population (M

import React from "react";
import {
  MarketAnalysis,
  BudgetVisualization,
  ImplementationRoadmap,
  RiskMatrix
} from "../components/visualizations";

export default function Visualizations() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-12" style={{color: "#f80f90"}}>
        Dyslexic AI Project Visualizations
      </h1>
      
      <div className="space-y-16">
        <MarketAnalysis />
        <BudgetVisualization />
        <ImplementationRoadmap />
        <RiskMatrix />
      </div>
    </div>
  );
}

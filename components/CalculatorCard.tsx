import React from 'react';
import { CalculatorType } from '../types';
import { ICONS } from '../constants';

interface CalculatorCardProps {
  title: CalculatorType;
  children: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      <div className="p-5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-blue-600">{ICONS[title]}</span>
          <h2 className="text-lg font-bold text-slate-700">{title}</h2>
        </div>
      </div>
      <div className="p-5 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default CalculatorCard;

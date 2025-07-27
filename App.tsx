import React, { useState } from 'react';
import { CalculatorType } from './types';
import { ICONS } from './constants';
import DripRateCalculator from './components/DripRateCalculator';
import DosingCalculator from './components/DosingCalculator';
import BsaCalculator from './components/BsaCalculator';
import BodyWeightCalculator from './components/BodyWeightCalculator';

const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(CalculatorType.DRIP_RATE);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case CalculatorType.DRIP_RATE:
        return <DripRateCalculator />;
      case CalculatorType.DOSING:
        return <DosingCalculator />;
      case CalculatorType.BSA:
        return <BsaCalculator />;
      case CalculatorType.BODY_WEIGHT:
        return <BodyWeightCalculator />;
      default:
        return <DripRateCalculator />;
    }
  };

  const NavButton: React.FC<{ type: CalculatorType }> = ({ type }) => {
    const isActive = activeCalculator === type;
    return (
      <button
        onClick={() => setActiveCalculator(type)}
        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-slate-200'
        }`}
      >
        {ICONS[type]}
        <span className="hidden sm:inline">{type}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-5v4h3l-4 5z"></path>
              </svg>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">Infusion Toolkit</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <nav className="bg-white p-2 rounded-xl shadow-sm mb-6 flex justify-around space-x-1 sm:space-x-2">
            <NavButton type={CalculatorType.DRIP_RATE} />
            <NavButton type={CalculatorType.DOSING} />
            <NavButton type={CalculatorType.BSA} />
            <NavButton type={CalculatorType.BODY_WEIGHT} />
        </nav>
        
        <div className="w-full max-w-2xl mx-auto">
          {renderCalculator()}
        </div>
      </main>

      <footer className="text-center py-4 mt-8">
        <p className="text-xs text-slate-500">This tool is for educational purposes only. Not for clinical decision making.</p>
      </footer>
    </div>
  );
};

export default App;

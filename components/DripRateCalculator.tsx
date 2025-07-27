import React, { useState, useCallback } from 'react';
import CalculatorCard from './CalculatorCard';
import { CalculatorType, Unit } from '../types';

interface Result {
  infusionRate: number;
  dripRate: number;
}

const DripRateCalculator: React.FC = () => {
  const [volume, setVolume] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<Unit>(Unit.HR);
  const [dropFactor, setDropFactor] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = useCallback(() => {
    const vol = parseFloat(volume);
    const t = parseFloat(time);
    const df = parseFloat(dropFactor);

    if (!isNaN(vol) && vol > 0 && !isNaN(t) && t > 0 && !isNaN(df) && df > 0) {
      const timeInHours = timeUnit === Unit.HR ? t : t / 60;
      const timeInMinutes = timeUnit === Unit.MIN ? t : t * 60;

      const infusionRate = vol / timeInHours;
      const dripRate = (vol * df) / timeInMinutes;
      
      setResult({ infusionRate, dripRate });
    } else {
      setResult(null);
    }
  }, [volume, time, timeUnit, dropFactor]);

  const handleClear = () => {
    setVolume('');
    setTime('');
    setDropFactor('');
    setTimeUnit(Unit.HR);
    setResult(null);
  };
  
  return (
    <CalculatorCard title={CalculatorType.DRIP_RATE}>
      <div className="space-y-4">
        <div>
          <label htmlFor="volume" className="block text-sm font-medium text-slate-600 mb-1">Total Volume</label>
          <div className="relative">
            <input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="e.g., 1000"
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-slate-500">mL</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-slate-600 mb-1">Infusion Time</label>
          <div className="flex gap-2">
            <input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 8"
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex rounded-md shadow-sm">
                <button
                    onClick={() => setTimeUnit(Unit.HR)}
                    className={`px-3 py-2 rounded-l-md border border-r-0 text-sm ${timeUnit === Unit.HR ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                >
                    hours
                </button>
                <button
                    onClick={() => setTimeUnit(Unit.MIN)}
                    className={`px-3 py-2 rounded-r-md border text-sm ${timeUnit === Unit.MIN ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                >
                    mins
                </button>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="dropFactor" className="block text-sm font-medium text-slate-600 mb-1">Drop Factor</label>
           <div className="relative">
             <input
              id="dropFactor"
              type="number"
              value={dropFactor}
              onChange={(e) => setDropFactor(e.target.value)}
              placeholder="e.g., 15"
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-slate-500">gtt/mL</span>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
            <button onClick={handleCalculate} className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Calculate
            </button>
            <button onClick={handleClear} className="w-full bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors">
                Clear
            </button>
        </div>

        {result && (
          <div className="pt-4 space-y-3">
            <h3 className="text-md font-semibold text-slate-700 border-t pt-4">Results</h3>
            <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-slate-600">Infusion Rate:</p>
                <p className="text-2xl font-bold text-blue-700">{result.infusionRate.toFixed(2)} <span className="text-lg font-medium">mL/hr</span></p>
            </div>
             <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-slate-600">Drip Rate:</p>
                <p className="text-2xl font-bold text-green-700">{result.dripRate.toFixed(2)} <span className="text-lg font-medium">gtt/min</span></p>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default DripRateCalculator;

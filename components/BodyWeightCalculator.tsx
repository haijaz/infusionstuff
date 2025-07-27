import React, { useState, useCallback } from 'react';
import CalculatorCard from './CalculatorCard';
import { CalculatorType, Unit, Sex } from '../types';

interface Result {
  ibw: number;
  adjBw: number;
}

const BodyWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<Unit>(Unit.CM);
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<Unit>(Unit.KG);
  const [sex, setSex] = useState<Sex>(Sex.Male);
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = useCallback(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!isNaN(h) && h > 0 && !isNaN(w) && w > 0) {
      const heightInInches = heightUnit === Unit.IN ? h : h / 2.54;
      const actualWeightInKg = weightUnit === Unit.KG ? w : w / 2.20462;
      
      let ibw = 0;
      const heightOver5FeetInInches = Math.max(0, heightInInches - 60);

      if (sex === Sex.Male) {
        ibw = 50 + (2.3 * heightOver5FeetInInches);
      } else {
        ibw = 45.5 + (2.3 * heightOver5FeetInInches);
      }
      
      const adjBw = ibw + 0.4 * (actualWeightInKg - ibw);

      setResult({ ibw, adjBw });
    } else {
      setResult(null);
    }
  }, [height, heightUnit, weight, weightUnit, sex]);

  const handleClear = () => {
    setHeight('');
    setWeight('');
    setHeightUnit(Unit.CM);
    setWeightUnit(Unit.KG);
    setSex(Sex.Male);
    setResult(null);
  };
  
  return (
    <CalculatorCard title={CalculatorType.BODY_WEIGHT}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Sex</label>
          <div className="flex rounded-md shadow-sm">
            <button onClick={() => setSex(Sex.Male)} className={`w-full px-3 py-2 rounded-l-md border text-sm ${sex === Sex.Male ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>Male</button>
            <button onClick={() => setSex(Sex.Female)} className={`w-full px-3 py-2 rounded-r-md border border-l-0 text-sm ${sex === Sex.Female ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>Female</button>
          </div>
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-slate-600 mb-1">Height</label>
          <div className="flex gap-2">
            <input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            <div className="flex rounded-md shadow-sm">
              <button onClick={() => setHeightUnit(Unit.CM)} className={`px-3 py-2 rounded-l-md border border-r-0 text-sm ${heightUnit === Unit.CM ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>cm</button>
              <button onClick={() => setHeightUnit(Unit.IN)} className={`px-3 py-2 rounded-r-md border text-sm ${heightUnit === Unit.IN ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>in</button>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-slate-600 mb-1">Actual Weight</label>
          <div className="flex gap-2">
            <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            <div className="flex rounded-md shadow-sm">
              <button onClick={() => setWeightUnit(Unit.KG)} className={`px-3 py-2 rounded-l-md border border-r-0 text-sm ${weightUnit === Unit.KG ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>kg</button>
              <button onClick={() => setWeightUnit(Unit.LBS)} className={`px-3 py-2 rounded-r-md border text-sm ${weightUnit === Unit.LBS ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>lbs</button>
            </div>
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
              <p className="text-slate-600">Ideal Body Weight (Devine):</p>
              <p className="text-2xl font-bold text-blue-700">{result.ibw.toFixed(2)} <span className="text-lg font-medium">kg</span></p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-slate-600">Adjusted Body Weight:</p>
              <p className="text-2xl font-bold text-green-700">{result.adjBw.toFixed(2)} <span className="text-lg font-medium">kg</span></p>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default BodyWeightCalculator;

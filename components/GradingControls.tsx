import React, { useState } from 'react';
import { GradingMethod, RelativeGradingParams } from '../types';
import InfoModal from './InfoModal';

interface GradingControlsProps {
  selectedMethod: GradingMethod;
  onMethodChange: (method: GradingMethod) => void;
  stats: { mean: number; stdDev: number } | null;
  studentCount: number;
  relativeParams: RelativeGradingParams;
  onRelativeParamsChange: (params: RelativeGradingParams) => void;
}

const PARAM_LABELS: Record<keyof Omit<RelativeGradingParams, 'aPlusPercent'>, string> = {
    a: 'A',
    aMinus: 'A-',
    b: 'B',
    bMinus: 'B-',
    c: 'C',
    cMinus: 'C-',
};


const GradingControls: React.FC<GradingControlsProps> = ({ selectedMethod, onMethodChange, stats, studentCount, relativeParams, onRelativeParamsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleParamChange = (param: keyof RelativeGradingParams, value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onRelativeParamsChange({ ...relativeParams, [param]: numericValue });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-stone-300 overflow-hidden">
        <button
          onClick={() => onMethodChange(GradingMethod.Absolute)}
          className={`flex-1 p-3 text-sm font-bold transition-colors ${selectedMethod === GradingMethod.Absolute ? 'bg-amber-700 text-white' : 'bg-white text-stone-700 hover:bg-stone-100'}`}
        >
          Absolute Grading
        </button>
        <button
          onClick={() => onMethodChange(GradingMethod.Relative)}
          className={`flex-1 p-3 text-sm font-bold transition-colors ${selectedMethod === GradingMethod.Relative ? 'bg-amber-700 text-white' : 'bg-white text-stone-700 hover:bg-stone-100'}`}
        >
          Relative Grading
        </button>
      </div>

      {selectedMethod === GradingMethod.Relative && (
        <div className="bg-stone-100 p-4 rounded-lg border border-stone-200 text-sm">
          <div className="flex justify-between items-center">
             <h4 className="font-bold text-stone-700">Relative Grading Stats</h4>
             <button onClick={() => setIsModalOpen(true)} className="text-amber-700 hover:text-amber-800 font-bold">
               What is this?
             </button>
          </div>
          {studentCount > 0 && stats ? (
            <div className="mt-2 space-y-1 text-stone-600">
              <p><strong>Mean (Average):</strong> {stats.mean.toFixed(2)}</p>
              <p><strong>Standard Deviation:</strong> {stats.stdDev.toFixed(2)}</p>
            </div>
          ) : (
             <p className="mt-2 text-stone-500">Enter student data to see stats.</p>
          )}

          <div className="mt-4 pt-4 border-t border-stone-200">
            <h4 className="font-bold text-stone-700 mb-3">Adjust Relative Thresholds</h4>
            <div className="space-y-3">
                <div className="grid grid-cols-3 items-center gap-2">
                    <label htmlFor="aPlusPercent" className="text-sm font-medium text-stone-600">A+ (% Cap)</label>
                    <input id="aPlusPercent" type="range" min="0" max="10" step="0.5" value={relativeParams.aPlusPercent} onChange={(e) => handleParamChange('aPlusPercent', e.target.value)} className="col-span-1 accent-amber-700" />
                    <span className="text-sm font-mono text-right text-stone-800">{relativeParams.aPlusPercent.toFixed(1)}%</span>
                </div>
                
                {(Object.keys(PARAM_LABELS) as Array<keyof typeof PARAM_LABELS>).map((key) => (
                    <div key={key} className="grid grid-cols-3 items-center gap-2">
                        <label htmlFor={key} className="text-sm font-medium text-stone-600">Grade ≥ {PARAM_LABELS[key]}</label>
                        <input id={key} type="range" min="-2.0" max="2.0" step="0.1" value={relativeParams[key]} onChange={(e) => handleParamChange(key, e.target.value)} className="col-span-1 accent-amber-700" />
                        <span className="text-sm font-mono text-right text-stone-800">μ + {relativeParams[key].toFixed(1)}σ</span>
                    </div>
                ))}
            </div>
          </div>

        </div>
      )}
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GradingControls;
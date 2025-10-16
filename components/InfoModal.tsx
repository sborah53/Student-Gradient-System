import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-auto transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
            <h2 id="info-modal-title" className="text-2xl font-bold text-amber-800 mb-4">Understanding Relative Grading</h2>
            <button onClick={onClose} className="text-stone-500 hover:text-stone-800 text-2xl font-bold" aria-label="Close modal">&times;</button>
        </div>
        
        <p className="text-stone-600 mb-4">
          Relative grading, also known as "grading on a curve," determines grades based on how a student performs compared to their classmates, rather than against a fixed scale.
        </p>

        <h3 className="text-xl font-bold text-stone-700 mb-2">How It Works Here:</h3>
        <ul className="list-disc list-inside space-y-2 text-stone-600">
            <li>A small, top percentage of students (e.g., 1-2%) are awarded an <strong>A+</strong>.</li>
            <li>Remaining grades are assigned based on how far a student's score is from the class average, measured in standard deviations.</li>
        </ul>

        <h3 className="text-xl font-bold text-stone-700 mt-6 mb-2">The Statistics Used</h3>
        <div className="space-y-4 text-stone-600">
            <div>
                <h4 className="font-semibold">Mean (μ) - The Class Average</h4>
                <p className="text-sm">This is the average score. It's calculated by summing all scores and dividing by the number of students (n).</p>
                <div className="text-center bg-stone-50 p-3 mt-2 rounded-lg border text-lg font-mono text-stone-800">μ = (Σx) / n</div>
            </div>
            <div>
                <h4 className="font-semibold">Standard Deviation (σ) - The Spread of Scores</h4>
                <p className="text-sm">This measures how spread out scores are from the average. A low value means scores are clustered together.</p>
                <div className="text-center bg-stone-50 p-3 mt-2 rounded-lg border text-lg font-mono text-stone-800">σ = √[ Σ(x - μ)² / n ]</div>
            </div>
        </div>

        <h3 className="text-xl font-bold text-stone-700 mt-6 mb-2">The Default Formula</h3>
        <p className="text-stone-600 mb-4">
            Grades are assigned based on a student's score in relation to the Mean (<strong>μ</strong>) and Standard Deviation (<strong>σ</strong>). You can adjust these multipliers in the controls.
        </p>
        <div className="text-sm bg-stone-50 p-4 rounded-lg border border-stone-200 font-mono text-stone-700 space-y-1">
            <p><span className="font-bold w-12 inline-block">A+</span>: Top % of class (e.g., 2%)</p>
            <p><span className="font-bold w-12 inline-block">A</span>:  score ≥ μ + 1.5σ</p>
            <p><span className="font-bold w-12 inline-block">A-</span>: score ≥ μ + 1.0σ</p>
            <p><span className="font-bold w-12 inline-block">B</span>:  score ≥ μ + 0.5σ</p>
            <p><span className="font-bold w-12 inline-block">B-</span>: score ≥ μ</p>
            <p><span className="font-bold w-12 inline-block">C</span>:  score ≥ μ - 0.5σ</p>
            <p><span className="font-bold w-12 inline-block">C-</span>: score ≥ μ - 1.0σ</p>
            <p><span className="font-bold w-12 inline-block">F</span>:  Otherwise</p>
        </div>
        
        <div className="mt-8 text-right">
          <button 
            onClick={onClose}
            className="bg-amber-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-800 transition-colors shadow"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
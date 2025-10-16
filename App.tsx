import React, { useState, useEffect, useCallback } from 'react';
import { Student, GradedStudent, GradingMethod, RelativeGradingParams } from './types';
import { calculateAbsoluteGrades, calculateRelativeGrades, calculateStats } from './services/gradingService';
import { DEFAULT_RELATIVE_PARAMS } from './constants';
import Header from './components/Header';
import DataInput from './components/DataInput';
import GradingControls from './components/GradingControls';
import ResultsTable from './components/ResultsTable';
import Documentation from './components/Documentation';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [gradedStudents, setGradedStudents] = useState<GradedStudent[]>([]);
  const [gradingMethod, setGradingMethod] = useState<GradingMethod>(GradingMethod.Absolute);
  const [stats, setStats] = useState<{ mean: number; stdDev: number } | null>(null);
  const [relativeParams, setRelativeParams] = useState<RelativeGradingParams>(DEFAULT_RELATIVE_PARAMS);

  const handleDataParsed = useCallback((parsedStudents: Student[]) => {
    setStudents(parsedStudents);
  }, []);

  useEffect(() => {
    if (students.length === 0) {
      setGradedStudents([]);
      setStats(null);
      return;
    }

    const calculatedStats = calculateStats(students);
    setStats(calculatedStats);

    if (gradingMethod === GradingMethod.Absolute) {
      setGradedStudents(calculateAbsoluteGrades(students));
    } else {
      setGradedStudents(calculateRelativeGrades(students, calculatedStats, relativeParams));
    }
  }, [students, gradingMethod, relativeParams]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg border border-stone-200">
            <h2 className="text-xl font-bold text-stone-700 mb-4">1. Input Data</h2>
            <DataInput onDataParsed={handleDataParsed} />
            <div className="mt-8">
               <h2 className="text-xl font-bold text-stone-700 mb-4">2. Select Grading Method</h2>
               <GradingControls
                selectedMethod={gradingMethod}
                onMethodChange={setGradingMethod}
                stats={stats}
                studentCount={students.length}
                relativeParams={relativeParams}
                onRelativeParamsChange={setRelativeParams}
              />
            </div>
          </div>
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-lg border border-stone-200">
             <h2 className="text-xl font-bold text-stone-700 mb-4">3. Graded Results</h2>
            <ResultsTable gradedStudents={gradedStudents} />
          </div>
        </div>
        <Documentation />
      </main>
      <Footer />
    </div>
  );
};

export default App;
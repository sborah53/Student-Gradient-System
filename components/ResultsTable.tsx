
import React from 'react';
import { GradedStudent } from '../types';

interface ResultsTableProps {
  gradedStudents: GradedStudent[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ gradedStudents }) => {

  const downloadCSV = () => {
    if (gradedStudents.length === 0) return;

    const headers = ['RollNo', 'Name', 'Marks', 'Grade', 'GradePoints', 'Remarks'];
    const rows = gradedStudents.map(s => [s.rollNo, s.name, s.marks, s.grade, s.gradePoints, s.remarks].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'graded_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={downloadCSV}
          disabled={gradedStudents.length === 0}
          className="bg-stone-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-stone-700 transition-colors shadow disabled:bg-stone-300 disabled:cursor-not-allowed"
        >
          Download as CSV
        </button>
      </div>

      <div className="overflow-x-auto border border-stone-200 rounded-lg">
        {gradedStudents.length > 0 ? (
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-100">
              <tr>
                {['Roll No', 'Name', 'Marks (%)', 'Grade', 'Grade Points', 'Remarks'].map((header) => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {gradedStudents.map((student) => (
                <tr key={student.rollNo} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{student.marks.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-stone-800">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{student.gradePoints}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{student.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 px-6">
            <p className="text-stone-500">Your results will appear here once data is processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTable;

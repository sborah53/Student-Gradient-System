import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Student } from '../types';

interface DataInputProps {
  onDataParsed: (students: Student[]) => void;
}

const SAMPLE_DATA = `201,Alice Johnson,92
202,Bob Williams,85
203,Charlie Brown,78
204,Diana Miller,95
205,Ethan Davis,64
206,Fiona Garcia,88
207,George Rodriguez,71
208,Hannah Martinez,99
209,Ian Hernandez,55
210,Jane Lopez,81
211,Kevin Gonzalez,76
212,Laura Wilson,90
213,Mason Anderson,83
214,Nora Thomas,79
215,Oscar Taylor,68`;

const DataInput: React.FC<DataInputProps> = ({ onDataParsed }) => {
  const [textData, setTextData] = useState(SAMPLE_DATA);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseData = useCallback((data: string) => {
    setError(null);
    const students: Student[] = [];
    const rows = data.trim().split('\n');

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].trim();
      if (!row) continue;

      const columns = row.split(/[,;\t]/).map(col => col.trim());

      if (columns.length !== 3) {
        setError(`Error on line ${i + 1}: Each row must have 3 columns (Roll No, Name, Marks).`);
        onDataParsed([]);
        return;
      }

      const [rollNo, name, marksStr] = columns;
      const marks = parseFloat(marksStr);

      if (isNaN(marks) || marks < 0 || marks > 100) {
        setError(`Error on line ${i + 1}: Marks must be a number between 0 and 100.`);
        onDataParsed([]);
        return;
      }
      
      if (!rollNo || !name) {
        setError(`Error on line ${i + 1}: Roll No and Name cannot be empty.`);
        onDataParsed([]);
        return;
      }

      students.push({ rollNo, name, marks });
    }
    onDataParsed(students);
  }, [onDataParsed]);
  
  useEffect(() => {
    if (SAMPLE_DATA) {
      parseData(SAMPLE_DATA);
    }
  }, [parseData]);

  const handleProcessText = () => {
    parseData(textData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTextData(content);
        parseData(content);
      };
      reader.onerror = () => {
        setError("Error reading file.");
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="data-input" className="block text-sm font-medium text-stone-600 mb-1">
          Paste Data (RollNo, Name, Marks)
        </label>
        <textarea
          id="data-input"
          rows={10}
          className="w-full p-3 border border-stone-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition"
          placeholder="e.g.&#10;101,John Doe,85&#10;102,Jane Smith,92.5"
          value={textData}
          onChange={(e) => setTextData(e.target.value)}
          aria-label="Student Data Input"
        />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md" role="alert">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleProcessText}
          className="flex-1 bg-amber-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors shadow"
        >
          Process Pasted Data
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv,.txt"
          onChange={handleFileChange}
          aria-hidden="true"
        />
        <button
          onClick={handleUploadClick}
          className="flex-1 bg-stone-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-stone-700 transition-colors shadow"
          aria-label="Upload CSV or TXT File"
        >
          Upload CSV/TXT File
        </button>
      </div>
    </div>
  );
};

export default DataInput;
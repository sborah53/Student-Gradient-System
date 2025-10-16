import { GradeDefinition, RelativeGradingParams } from './types';

export const GRADE_DEFINITIONS: GradeDefinition[] = [
  { grade: 'A+', gradePoints: 10, remarks: 'Outstanding', minMarks: 95 },
  { grade: 'A', gradePoints: 10, remarks: 'Excellent', minMarks: 90 },
  { grade: 'A-', gradePoints: 9, remarks: 'Very Good', minMarks: 85 },
  { grade: 'B', gradePoints: 8, remarks: 'Good', minMarks: 80 },
  { grade: 'B-', gradePoints: 7, remarks: 'Satisfactory', minMarks: 75 },
  { grade: 'C', gradePoints: 6, remarks: 'Marginal', minMarks: 70 },
  { grade: 'C-', gradePoints: 5, remarks: 'Unsuccessful', minMarks: 65 },
  { grade: 'F', gradePoints: 0, remarks: 'Failure', minMarks: 0 },
  { grade: 'I', gradePoints: '--', remarks: 'Incomplete' },
  { grade: 'AU', gradePoints: '--', remarks: 'Audit' },
  { grade: 'S', gradePoints: '--', remarks: 'Satisfactory' },
  { grade: 'U', gradePoints: '--', remarks: 'Unsatisfactory' },
];

export const DEFAULT_RELATIVE_PARAMS: RelativeGradingParams = {
  aPlusPercent: 2,
  a: 1.5,
  aMinus: 1.0,
  b: 0.5,
  bMinus: 0.0, // at the mean
  c: -0.5,
  cMinus: -1.0,
};
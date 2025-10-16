export interface Student {
  rollNo: string;
  name: string;
  marks: number;
}

export interface GradedStudent extends Student {
  grade: string;
  gradePoints: number | string;
  remarks: string;
}

export enum GradingMethod {
  Absolute = 'Absolute',
  Relative = 'Relative',
}

export interface GradeDefinition {
  grade: string;
  gradePoints: number | string;
  remarks: string;
  minMarks?: number; // Used for Absolute Grading
}

export interface RelativeGradingParams {
  aPlusPercent: number; // Percentage for A+ cap
  a: number; // Multiplier for A
  aMinus: number;
  b: number;
  bMinus: number;
  c: number;
  cMinus: number;
}
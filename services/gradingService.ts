import { Student, GradedStudent, GradeDefinition, RelativeGradingParams } from '../types';
import { GRADE_DEFINITIONS } from '../constants';

// Helper to find a grade definition for a given mark in absolute grading
const getGradeByMarks = (marks: number): GradeDefinition => {
  // Filter for numeric grades and sort descending by minMarks
  const numericGrades = GRADE_DEFINITIONS.filter(g => typeof g.minMarks === 'number').sort((a, b) => (b.minMarks!) - (a.minMarks!));
  return numericGrades.find(g => marks >= g.minMarks!) || GRADE_DEFINITIONS.find(g => g.grade === 'F')!;
};

export const calculateAbsoluteGrades = (students: Student[]): GradedStudent[] => {
  return students.map(student => {
    const gradeInfo = getGradeByMarks(student.marks);
    return {
      ...student,
      grade: gradeInfo.grade,
      gradePoints: gradeInfo.gradePoints,
      remarks: gradeInfo.remarks,
    };
  });
};

interface Stats {
  mean: number;
  stdDev: number;
}

export const calculateStats = (students: Student[]): Stats => {
  if (students.length === 0) {
    return { mean: 0, stdDev: 0 };
  }
  const marks = students.map(s => s.marks);
  const sum = marks.reduce((acc, val) => acc + val, 0);
  const mean = sum / students.length;

  const variance = marks.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / students.length;
  const stdDev = Math.sqrt(variance);

  return { mean, stdDev };
};

export const calculateRelativeGrades = (
  students: Student[],
  stats: Stats,
  params: RelativeGradingParams
): GradedStudent[] => {
  const { mean, stdDev } = stats;
  
  if (students.length === 0) return [];

  const sortedStudents = [...students].sort((a, b) => b.marks - a.marks);
  const gradedResultMap = new Map<string, GradedStudent>();

  // 1. Assign A+ based on percentage cap
  const aPlusCount = Math.ceil(sortedStudents.length * (params.aPlusPercent / 100));
  const aPlusGradeInfo = GRADE_DEFINITIONS.find(g => g.grade === 'A+')!;
  
  for (let i = 0; i < aPlusCount; i++) {
    const student = sortedStudents[i];
    if (student) {
      gradedResultMap.set(student.rollNo, {
        ...student,
        grade: aPlusGradeInfo.grade,
        gradePoints: aPlusGradeInfo.gradePoints,
        remarks: aPlusGradeInfo.remarks,
      });
    }
  }

  // 2. Grade the rest of the students
  const remainingStudents = sortedStudents.filter(s => !gradedResultMap.has(s.rollNo));

  const getRelativeGrade = (marks: number): GradeDefinition => {
    if (stdDev === 0) {
      return GRADE_DEFINITIONS.find(g => g.grade === 'B')!;
    }
    if (marks >= mean + params.a * stdDev) return GRADE_DEFINITIONS.find(g => g.grade === 'A')!;
    if (marks >= mean + params.aMinus * stdDev) return GRADE_DEFINITIONS.find(g => g.grade === 'A-')!;
    if (marks >= mean + params.b * stdDev) return GRADE_DEFINITIONS.find(g => g.grade === 'B')!;
    if (marks >= mean + params.bMinus * stdDev) return GRADE_DEFINITIONS.find(g => g.grade === 'B-')!;
    if (marks >= mean + params.c * stdDev) return GRADE_DEFINITIONS.find(g => g.grade === 'C')!;
    if (marks >= mean + params.cMinus * stdDev) return GRADE_DEFINITIONS.find(g => g.grade === 'C-')!;
    return GRADE_DEFINITIONS.find(g => g.grade === 'F')!;
  };
  
  for (const student of remainingStudents) {
    const gradeInfo = getRelativeGrade(student.marks);
    gradedResultMap.set(student.rollNo, {
      ...student,
      grade: gradeInfo.grade,
      gradePoints: gradeInfo.gradePoints,
      remarks: gradeInfo.remarks,
    });
  }

  // Restore original order using the map
  return students.map(s => gradedResultMap.get(s.rollNo)!);
};
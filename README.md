# Student grading system

  <div class="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            <h2 class="text-3xl font-bold mb-4 border-b pb-3">Documentation & Methodology</h2>
            <div class="space-y-6 text-slate-700">
                <div>
                    <h3 class="text-xl font-semibold mb-2 text-indigo-600">How to Use This Tool</h3>
                    <ol class="list-decimal list-inside space-y-2">
                        <li><strong>Input Data:</strong> Paste your CSV data into the text box or upload a <code>.csv</code> file. The file must have headers like <code>Roll</code>, <code>Name</code>, and <code>Marks</code>. You can also click "Load Example" to see the required format.</li>
                        <li><strong>Parse Data:</strong> Click the "Parse Input" button. This will read your data and show a statistical summary and a histogram of the marks distribution. The configuration panel will also appear.</li>
                        <li><strong>Configure Grading:</strong> Choose a grading scheme (Absolute or Relative) and adjust the parameters like cutoff marks, percentiles, or the A+ cap using the sliders and input fields.</li>
                        <li><strong>Compute Grades:</strong> Click "Compute Grades". The tool will calculate grades for all students and display the results in a table and update the grade distribution charts.</li>
                        <li><strong>Export Results:</strong> You can download the final graded table as a new CSV file or copy it to your clipboard for pasting elsewhere.</li>
                    </ol>
                </div>
                 <div>
                    <h3 class="text-xl font-semibold mb-2 text-indigo-600">Grading Methodologies</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-bold text-lg">1. Absolute Grading</h4>
                            <p>This is a straightforward method where grades are assigned based on predefined score ranges. If a student's marks are above a certain cutoff, they receive the corresponding grade. The cutoffs can be adjusted using the sliders.</p>
                            <p class="mt-1 text-sm font-mono bg-slate-100 p-2 rounded">Example: If A- cutoff is 70, any student with marks ≥ 70 (and less than the 'A' cutoff) gets an A-.</p>
                        </div>
                         <div>
                            <h4 class="font-bold text-lg">2. Relative Grading</h4>
                            <p>This method grades students based on their performance relative to their peers. This is useful when an exam is unusually easy or difficult. This tool provides three relative grading techniques:</p>
                            <ul class="list-disc list-inside mt-2 space-y-2 pl-4">
                                <li>
                                    <strong>Percentile-based:</strong> Students are ranked from highest to lowest score. Grades are assigned based on this ranking. For this method, <strong>the top 2% of students are automatically assigned 'A+'</strong>. You can then define the percentile cutoffs for the remaining grades.
                                </li>
                                <li>
                                    <strong>Mean & Standard Deviation (SD):</strong> This method uses the class average (mean) and the spread of scores (SD) to determine grades. A student's grade depends on how many standard deviations their score is above or below the mean.
                                    <p class="mt-1 text-sm font-mono bg-slate-100 p-2 rounded">Formula: Grade depends on thresholds for <code>(Student's Marks - Mean) / SD</code>.</p>
                                </li>
                                <li>
                                    <strong>Curve Scaling:</strong> This technique first rescales all marks to fit a standard 0-100 range. The student with the highest score gets 100, and the one with the lowest gets 0. Then, the absolute grading cutoffs are applied to these new "scaled" marks.
                                     <p class="mt-1 text-sm font-mono bg-slate-100 p-2 rounded">Formula: <code>Scaled Mark = ((Original Mark - Min Mark) / (Max Mark - Min Mark)) * 100</code>.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


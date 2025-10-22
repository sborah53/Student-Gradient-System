# Documentation & Methodology

### How to Use This Tool
1.  **Input Data:** Paste your CSV data or upload a `.csv` file. The file must have headers like `Roll`, `Name`, and `Marks`.
2.  **Parse Data:** Click "Parse Input". This reads the data and shows a statistical summary of the marks.
3.  **Configure Grading:** Choose a grading scheme (Absolute or Relative) and adjust the parameters like cutoff marks or percentiles.
4.  **Compute Grades:** Click "Compute Grades". The tool will calculate grades for all students and display the results in the table and charts.
5.  **Export Results:** Download the final graded table as a CSV file or copy it to your clipboard.

---

### Grading Methodologies

#### 1. Absolute Grading
Grades are assigned based on predefined score ranges that you set using the sliders. This method is straightforward and measures performance against a fixed scale, making it transparent and easy to understand.

---

#### 2. Relative Grading
This method grades students based on their performance relative to their peers, making it useful for norm-referenced assessments.

**Percentile-based**
*   **Description:** Students are ranked by score. A grade is assigned based on the student's cumulative percentile rank. For example, setting the 'A' cutoff to 15% means the top 15% of students (including A+) will receive an 'A' grade or higher.
*   **Formula:**
    ```
    Percentile Rank (P) = (Student's Rank / Total Students) * 100
    ```
*   **Condition:** A student receives a grade if their `P` is less than or equal to the grade's cutoff percentile.

**Mean & Standard Deviation (SD)**
*   **Description:** This statistical method grades students based on their score's distance from the class average (mean), measured in standard deviations (SD). It is effective for large classes with a normal distribution of scores.
*   **Formulas:**
    *   Mean (μ): `μ = (Σxᵢ) / N` (Sum of scores / Number of students)
    *   Standard Deviation (σ): `σ = √[ Σ(xᵢ - μ)² / (N-1) ]` (Sample SD)
*   **Condition:** A grade is assigned if `Score ≥ μ + (Multiplier × σ)`.

**Curve Scaling**
*   **Description:** This method normalizes all scores to fit a 0-100 range by mapping the lowest score to 0 and the highest to 100. The standard absolute cutoffs are then applied to these new scaled scores. This is useful for adjusting scores from an exam that was unusually hard or easy.
*   **Formula:**
    ```
    Scaled Score = ((Original Score - Min Score) / (Max Score - Min Score)) * 100
    ```
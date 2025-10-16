import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-stone-200 mt-8">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">How to Use This Tool</h2>
      
      <div className="space-y-8 text-stone-700">
        
        <section>
          <h3 className="text-lg font-bold mb-2">Step 1: Provide Student Data</h3>
          <p>You have two easy ways to input your class data:</p>
          <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
            <li><strong>Paste Data:</strong> Copy your data from a spreadsheet (like Excel or Google Sheets) and paste it into the text box. A sample dataset is provided by default.</li>
            <li><strong>Upload File:</strong> Click the "Upload CSV/TXT File" button to select a file from your computer.</li>
          </ul>
          <div className="mt-3 bg-stone-100 p-4 rounded-lg border border-stone-200 text-sm">
            <p className="font-bold">Required Format:</p>
            <p>Each line must contain three pieces of information, separated by a comma, semicolon, or tab:</p>
            <code className="block mt-2 font-mono">Roll Number, Student Name, Marks (0-100)</code>
            <p className="mt-2"><strong>Example:</strong></p>
            <code className="block font-mono">301,Peter Jones,77.5</code>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold mb-2">Step 2: Choose and Configure a Grading Method</h3>
          <p>After inputting data, select one of the two grading methods:</p>
          <ul className="list-disc list-inside mt-2 pl-4 space-y-2">
            <li><strong>Absolute Grading:</strong> Grades are assigned based on a fixed percentage scale (e.g., 90-100% is an 'A'). This method is straightforward and doesn't depend on how other students perform.</li>
            <li><strong>Relative Grading:</strong> Grades are "curved" based on the class's overall performance. This is useful for adjusting for assessment difficulty.
                <ul className="list-['-_'] list-inside mt-2 pl-4 text-sm space-y-1">
                    <li>Use the sliders to <strong>adjust the thresholds</strong> for each grade.</li>
                    <li>Set the <strong>"A+ (% Cap)"</strong> to limit the top grade to a specific percentage of students.</li>
                    <li>Click "What is this?" for a detailed explanation of the formulas.</li>
                </ul>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold mb-2">Step 3: View and Download Results</h3>
          <p>The graded results will appear on the right. You can review them directly on the page.</p>
          <p>Click the <strong>"Download as CSV"</strong> button to save the complete, graded sheet to your computer for your records.</p>
        </section>
        
        <section>
          <h3 className="text-lg font-bold text-amber-800 mb-2 border-t pt-6">Hosting & Sharing Your Grader</h3>
          <p>This tool is a self-contained web application. You can run it on your personal desktop or host it online for free to share with others.</p>

          <h4 className="font-semibold mt-4 mb-2">Option 1: Host Online with GitHub Pages (Recommended)</h4>
          <p>This is the easiest way to get a shareable link.</p>
          <ol className="list-decimal list-inside mt-2 pl-4 space-y-1 text-sm">
              <li><strong>Create a GitHub Account:</strong> If you don't have one, sign up at <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">github.com</a>.</li>
              <li><strong>Create a New Repository:</strong> Click the "+" icon in the top-right and select "New repository". Give it a name (e.g., "student-grader"). Make it "Public".</li>
              <li><strong>Upload Files:</strong> In your new repository, click "Add file" &gt; "Upload files". Drag and drop all the application files (`index.html`, `index.tsx`, `App.tsx`, etc.) into the browser window.</li>
              <li><strong>Enable GitHub Pages:</strong> Go to your repository's "Settings" tab. In the left menu, click on "Pages". Under "Branch", select "main" (or "master") and click "Save".</li>
              <li><strong>Share Your Link:</strong> After a few minutes, GitHub will display a URL for your live site (e.g., `https://your-username.github.io/student-grader/`). You can share this link with anyone!</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2">Option 2: Use on Your Personal Desktop</h4>
          <p>To use this tool offline, you'll need a simple local web server.</p>
           <ol className="list-decimal list-inside mt-2 pl-4 space-y-1 text-sm">
              <li><strong>Download a Code Editor:</strong> We recommend <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">Visual Studio Code</a> (it's free).</li>
              <li><strong>Install the "Live Server" Extension:</strong> In VS Code, go to the Extensions view (icon with four squares) and search for "Live Server" by Ritwick Dey. Click "Install".</li>
              <li><strong>Open the Project:</strong> Open the folder containing all the app files in VS Code.</li>
              <li><strong>Go Live:</strong> Right-click on the `index.html` file in the file explorer and select "Open with Live Server". This will open the application in your web browser.</li>
          </ol>
        </section>
        
      </div>
    </div>
  );
};

export default Documentation;
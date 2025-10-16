
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md border-b-2 border-stone-200">
      <div className="container mx-auto py-5 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-stone-800 tracking-wider">
          <span className="text-amber-800">THE</span> GRADE SHEET
          <span className="text-amber-800 text-4xl tracking-widest ml-2">....</span>
        </h1>
        <p className="text-stone-500 mt-1">A simple tool for absolute & relative student grading.</p>
      </div>
    </header>
  );
};

export default Header;

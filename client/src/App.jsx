import React from "react";
import "./index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className=" h-[10vh] grid">
        <div className="col-span-1">
          <Header />
        </div>
      </div>
      <div className="min-h-screen grid grid-cols-6">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5"></div>
      </div>
    </>
  );
}

export default App;

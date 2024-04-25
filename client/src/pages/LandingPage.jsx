import React, {useState} from "react";
import Header from "../components/Header";

function LandingPage() {
    const [count, setCount] = useState(0)
    return (
        <>
        <div className="bg-gray-300 w-full h-screen">
           {/* Navbar*/}
           <Header />
        </div>
        </>
    )
}


export default LandingPage;
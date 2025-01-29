// import React from 'react'
// import Navbar from './Navbar'

// import Tabs from './Tabs'
// import Footer from './Footer'
// const HomePage = () => {

//   return (
//     <div className='container'>
//       <Navbar />
//       <Tabs />
//       <Footer />
//     </div>
//   )
// }

// export default HomePage
import React from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
    >
     
      <Navbar />
      
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Tabs />
      </div>
      
      
      <Footer />
    </div>
  );
};

export default HomePage;


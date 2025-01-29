
import React, { useState } from "react";
import AllCars from "./AllCars";
import ProductCreationPage from "./ProductCreationPage";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "🚗 All Cars", component: <AllCars /> },
    { id: 1, title: "➕ Add New Car", component: <ProductCreationPage /> },
  ];

  return (
    <div className="container-fluid mt-4 p-0"> 
      
      <ul className="nav nav-pills justify-content-center mb-3 bg-light p-2 rounded shadow-sm w-100">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                transition: "0.3s",
              }}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

     
      <div className="tab-content p-3 border rounded shadow  w-100 m-0 "> 
        {tabs.map((tab, index) => (
          <div key={tab.id} className={`tab-pane ${activeTab === index ? "show active" : "d-none"}`}>
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
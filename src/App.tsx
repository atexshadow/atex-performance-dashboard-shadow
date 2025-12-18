
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
const App: React.FC = () => {
  return (
   <HomePage></HomePage>
  );
};

export default App;




// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./Features/Routes/AppRoutes";

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// };

// export default App;

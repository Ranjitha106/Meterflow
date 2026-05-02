import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/ApiKeys";
import UsageLogs from "./pages/UsageLogs";
import Billing from "./pages/Billing";
import Signup from "./pages/Signup";


// const PlaceholderDashboard = () => (
//   <div className="p-10 text-center">
//     <h1 className="text-2xl font-bold">Dashboard Coming Soon!</h1>
//     <p>You have successfully logged in.</p>
//     <button
//       onClick={() => {
//         localStorage.clear();
//         window.location.reload();
//       }}
//       className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//     >
//       Logout
//     </button>
//   </div>
// );

function App() {
  
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

       <Route path="/" element={<Landing />} />
        <Route
          path="/api-keys"
          element={isAuthenticated ? <ApiKeys /> : <Navigate to="/login" />}
        />
        <Route
          path="/usage-logs"
          element={isAuthenticated ? <UsageLogs /> : <Navigate to="/login" />}
        />
        <Route
          path="/billing"
          element={isAuthenticated ? <Billing /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

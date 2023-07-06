import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import RegisterForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";

// Screens Imports
import InventoryGroup from "scenes/inventory/group";
import InventoryItem from "scenes/inventory/items";
import InventoryBrand from "scenes/inventory/brand";
import InventoryRawItem from "scenes/inventory/rawItem";
import InventoryVendorManagement from "scenes/inventory/vendor-management";
import InviteStudents from "scenes/students/inviteStudent/invitestudent";
import AllStudents from 'scenes/students/allStudent/allStudent';
import ArchievedStudents from 'scenes/students/archievedStudents/archievedStudents';
import DropOutStudents from 'scenes/students/dropoutStudents/dropoutStudents';
import RecordingStudents from 'scenes/students/Recording/recording';
import AddCourse from 'scenes/courses/AddCourse';
import AddChapter from "scenes/courses/AddChapter";
import AddCategory from "scenes/courses/AddCategory";
import AddResource from "scenes/courses/AddResource";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForms, setShowForms] = useState(true);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status); // Update the authentication status based on the value received
    setShowForms(false); // Hide the login and registration forms after bypassing authentication
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {showForms && (
              <Route
                path="/"
                element={
                  <div>
                    <RegisterForm
                      handleAuthentication={handleAuthentication}
                    />
                    <LoginForm handleAuthentication={handleAuthentication} />
                  </div>
                }
              />
            )}
            {isAuthenticated && !showForms && (
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} />

                {/* Inventory Routes */}
                <Route path="/group" element={<InventoryGroup />} />
                <Route path="/items" element={<InventoryItem />} />
                <Route path="/brand" element={<InventoryBrand />} />
                <Route path="/raw-item" element={<InventoryRawItem />} />
                <Route
                  path="/vendor-management"
                  element={<InventoryVendorManagement />}
                />

                {/* Students Routes */}
                <Route path="/Invite-Students" element={<InviteStudents />} />
                <Route path="/All-Students" element={<AllStudents />} />
                <Route
                  path="/Archieved-Students"
                  element={<ArchievedStudents />}
                />
                <Route
                  path="/DropOut-Students"
                  element={<DropOutStudents />}
                />
                <Route
                  path="/Recording-Students"
                  element={<RecordingStudents />}
                />

                 {/* Courses Routes */}
                 <Route path="/Add-Course" element={<AddCourse />} />
                 <Route path="/Add-Chapter" element={<AddChapter />} />
                 <Route path="/Add-Category" element={<AddCategory />} />
                 <Route path="/Add-Resource" element={<AddResource />} />
              </Route>
              
            )}
            {!isAuthenticated && !showForms && (
              <Route path="/*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

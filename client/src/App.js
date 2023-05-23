import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
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
import InventoryRawItem from "scenes/inventory/raw-item";
import InventoryVendorManagement from "scenes/inventory/vendor-management";

// Settings Imports
import SettingsPurchasesAmountLimiter from "scenes/settings/purchases-amount-limiter";
import SettingsDiscountKeys from "scenes/settings/discount-keys";
import SettingsGst from "scenes/settings/gst";
import SettingsUnitOfMeasure from "scenes/settings/unit-of-measure";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
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
              <Route path="/vendor-management" element={<InventoryVendorManagement />} />
              {/* Settings Routes */}
              <Route path="/purchase-amount-limiter" element={<SettingsPurchasesAmountLimiter />} />
              <Route path="/discount-keys" element={<SettingsDiscountKeys />} />
              <Route path="/gst" element={<SettingsGst />} />
              <Route path="/unit-of-measure" element={<SettingsUnitOfMeasure />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
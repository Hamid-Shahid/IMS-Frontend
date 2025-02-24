import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useGetToken from "./hooks";
import Navbar from "./components/Navbar";

const SignIn = lazy(() => import("./pages/authentication/SignIn"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Register = lazy(() => import("./pages/authentication/Register"));
const Material = lazy(() => import("./pages/material/Material"));
const CreateMaterial = lazy(() => import("./pages/material/CreateMaterial"));
const UpdateMaterial = lazy(() => import("./pages/material/UpdateMaterial"));
const Vendor = lazy(() => import("./pages/vendor/Vendor"));
const CreateVendor = lazy(() => import("./pages/vendor/CreateVendor"));
const UpdateVendor = lazy(() => import("./pages/vendor/UpdateVendor"));
const Order = lazy(() => import("./pages/order/Order"));
const PlaceOrder = lazy(() => import("./pages/order/PlaceOrder"));
const UpdateOrder = lazy(() => import("./pages/order/UpdateOrder"));
const Product = lazy(() => import("./pages/product/Product"));
const CreateProduct = lazy(() => import("./pages/product/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/product/UpdateProduct"));
const Production = lazy(() => import("./pages/production/Production"));
const CreateProduction = lazy(() =>
  import("./pages/production/CreateProduction")
);
const UpdateProduction = lazy(() =>
  import("./pages/production/UpdateProduction")
);
const Sale = lazy(() => import("./pages/sale/Sale"));
const CreateSale = lazy(() => import("./pages/sale/CreateSale"));
const UpdateSale = lazy(() => import("./pages/sale/UpdateSale"));

const App = () => {
  const token = useGetToken();
  const { user } = useSelector((state) => state.authentication);

  if (!token && !user) return <AuthRouter />;

  return <AppRouter />;
};

const AuthRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Suspense>
  );
};

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Material Routes */}
          <Route path="/material" element={<Material />} />
          <Route path="/add-material" element={<CreateMaterial />} />
          <Route path="/edit-material/:id" element={<UpdateMaterial />} />

          {/* Vendor Routes */}
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/add-vendor" element={<CreateVendor />} />
          <Route path="/edit-vendor/:id" element={<UpdateVendor />} />

          {/* Order Routes */}
          <Route path="/order" element={<Order />} />
          <Route path="/add-order" element={<PlaceOrder />} />
          <Route path="/edit-order/:id" element={<UpdateOrder />} />

          {/* Product Routes */}
          <Route path="/product" element={<Product />} />
          <Route path="/add-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<UpdateProduct />} />

          {/* Production Routes */}
          <Route path="/production" element={<Production />} />
          <Route path="/add-production" element={<CreateProduction />} />
          <Route path="/edit-production/:id" element={<UpdateProduction />} />

          {/* Sale Routes */}
          <Route path="/sale" element={<Sale />} />
          <Route path="/add-sale" element={<CreateSale />} />
          <Route path="/edit-sale/:id" element={<UpdateSale />} />

          {/* Error Handler */}
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

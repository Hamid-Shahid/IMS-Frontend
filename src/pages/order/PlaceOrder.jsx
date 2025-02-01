import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { orderSchema } from "../../validations";
import { getAllVendors } from "../../services/vendor";
import { ClipLoader } from "react-spinners";
import { createOrder } from "../../services/order";

const PlaceOrder = () => {
  const dispatch = useDispatch();

  const { vendors, loading: vendorLoading } = useSelector(
    (state) => state.vendor
  );
  const { loading } = useSelector((state) => state.order);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      vendorName: "",
      materialName: "",
      quantity: "",
    },
  });

  const [filteredOrders, setFilteredOrders] = useState([]);

  const selectedVendor = watch("vendorName");

  useEffect(() => {
    if (selectedVendor) {
      const vendor = vendors.find((v) => v.name === selectedVendor);
      setFilteredOrders(vendor?.materials || []);
    } else {
      setFilteredOrders([]);
    }
  }, [selectedVendor, vendors]);

  const onSubmit = (order) => {
    dispatch(createOrder(order))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error in creating order:", error.message);
      });
  };

  useEffect(() => {
    dispatch(getAllVendors());
  }, [dispatch]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="w-[96%] lg:max-w-lg p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-6">Place Order</h2>
        {vendorLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ClipLoader loading={vendorLoading} color={"blue"} size={50} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="vendorName"
                className="block text-sm font-medium text-gray-700"
              >
                Vendor
              </label>
              <select
                id="vendorName"
                {...register("vendorName")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.vendorName ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor.name}>
                    {vendor.name}
                  </option>
                ))}
              </select>
              {errors.vendorName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.vendorName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="materialName"
                className="block text-sm font-medium text-gray-700"
              >
                Material
              </label>
              <select
                id="materialName"
                {...register("materialName")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.materialName ? "border-red-500" : "border-gray-300"
                }`}
                disabled={!filteredOrders.length}
              >
                <option value="">Select Material</option>
                {filteredOrders.map((material, index) => (
                  <option key={index} value={material.name}>
                    {material.name}
                  </option>
                ))}
              </select>
              {errors.materialName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.materialName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                {...register("quantity", { valueAsNumber: true })}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Quantity"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-sm text-sm bg-[#213555] hover:bg-[#3E5879] text-white py-3 rounded-md focus:outline-none focus:ring-2"
            >
              {loading ? (
                <ClipLoader loading={loading} color={"white"} size={12} />
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;

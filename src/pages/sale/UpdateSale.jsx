import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSaleById, updateSale } from "../../services/sale";
import { getAllProducts } from "../../services/product"; 
import { ClipLoader } from "react-spinners";
import { saleSchema } from "../../validations";



const UpdateSale = () => {
  const { id } = useParams(); // Get sale ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sale, loading } = useSelector((state) => state.sale); 
  const { products } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(saleSchema
      
    ),
    defaultValues: {
      productName: "",
      customerName: "",
      noOfUnitsSold: "",
    },
  });

  useEffect(() => {
    dispatch(getSaleById(id));
    dispatch(getAllProducts());
  }, [dispatch, id]);

  useEffect(() => {
    if (sale) {
      setValue("productName", sale.productName);
      setValue("customerName", sale.customerName);
      setValue("noOfUnitsSold", sale.noOfUnitsSold);
    }
  }, [sale, setValue]);

  const onSubmit = (sale) => {
    dispatch(updateSale({ id, sale }))
      .unwrap()
      .then(() => {
        navigate("/sale");
      })
      .catch((error) => {
        console.error("Error updating sale:", error.message);
      });
  };

  return (
    <div className="w-[96%] sm:max-w-lg mx-auto p-6 bg-white rounded-md shadow-md mt-16">
      <h2 className="text-xl font-semibold mb-6">Update Sale</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <ClipLoader loading={loading} color={"blue"} size={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name Dropdown */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <select
              id="productName"
              {...register("productName")}
              className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Customer Name Input */}
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              {...register("customerName")}
              className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.customerName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Customer Name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Number of Units Sold Input */}
          <div>
            <label
              htmlFor="noOfUnitsSold"
              className="block text-sm font-medium text-gray-700"
            >
              No. of Units Sold
            </label>
            <input
              type="number"
              id="noOfUnitsSold"
              {...register("noOfUnitsSold", { valueAsNumber: true })}
              className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.noOfUnitsSold ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter No. of Units Sold"
            />
            {errors.noOfUnitsSold && (
              <p className="text-red-500 text-xs mt-1">
                {errors.noOfUnitsSold.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-sm text-sm bg-[#213555] hover:bg-[#3E5879] text-white py-3 rounded-md focus:outline-none focus:ring-2"
            >
            Update Sale
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateSale;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { createMaterial } from "../../services/material";
import { materialSchema } from "../../validations";


const CreateMaterial = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.material);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(materialSchema),
  });

  const onSubmit = (material) => {
    dispatch(createMaterial(material))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error in creating material:", error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white my-10 p-8 rounded-lg shadow-md w-[90%] lg:w-[55%]"
      >
        <h1 className="text-xl font-bold mb-6">Add Material</h1>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Material Name
          </label>
          <input
            type="text"
            placeholder="Enter material name"
            className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="stock"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
            {...register("stock")}
          />
          {errors.stock && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.stock.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="unit"
          >
            Unit of Measurement
          </label>
          <input
            type="text"
            placeholder="Enter unit (e.g., Litre)"
            className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.unit ? "border-red-500" : "border-gray-300"
            }`}
            {...register("unit")}
          />
          {errors.unit && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.unit.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="threshold"
          >
            Threshold Level
          </label>
          <input
            type="number"
            placeholder="Enter threshold"
            className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.threshold ? "border-red-500" : "border-gray-300"
            }`}
            {...register("threshold")}
          />
          {errors.threshold && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.threshold.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            placeholder="Enter material description"
            rows="4"
            className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-sm text-sm bg-[#213555] hover:bg-[#3E5879] text-white py-3 rounded-md focus:outline-none focus:ring-2"
          >
          {loading ? (
            <ClipLoader loading={loading} color={"white"} size={12} />
          ) : (
            "Add Material"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateMaterial;

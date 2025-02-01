import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialById, updateMaterial } from "../../services/material";
import { materialSchema } from "../../validations";

const UpdateMaterial = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, material } = useSelector((state) => state.material);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(materialSchema),
  });

  const onSubmit = (material) => {
    dispatch(updateMaterial({ id, material }))
      .unwrap()
      .then(() => navigate("/material"))
      .catch((error) => {
        console.error("Error in updating material:", error.message);
      });
  };

  useEffect(() => {
    if (material) {
      reset({
        name: material.name || "",
        stock: material.stock || "",
        unit: material.unit || "",
        threshold: material.threshold || "",
        description: material.description || "",
      });
    }
  }, [material, reset]);

  useEffect(() => {
    dispatch(getMaterialById(id));
  }, [id]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="w-[96%] lg:max-w-lg mx-auto p-6 bg-white rounded-md shadow-md my-10">
        <h2 className="text-xl font-semibold mb-6">Update Material</h2>
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <ClipLoader loading={loading} color={"blue"} size={50} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg shadow-md "
          >
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
              Update Material
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateMaterial;

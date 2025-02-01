import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../services/product";
import { getAllMaterials } from "../../services/material";
import { useNavigate } from "react-router-dom";
import { productSchema } from "../../validations";
import Select from "react-select";
import { ClipLoader } from "react-spinners";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.product);
  const { materials } = useSelector((state) => state.material);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: "",
      pricePerUnit: "",
      rawMaterials: [],
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      rawMaterials: data.rawMaterials.map((material) => material.value),
    };

    dispatch(createProduct(formattedData))
      .unwrap()
      .then(() => navigate("/product"))
      .catch((error) => {
        console.error("Error creating product:", error.message);
      });
  };

  const handleMaterialChange = (selectedOptions) => {
    setValue("rawMaterials", selectedOptions || []);
  };

  useEffect(() => {
    dispatch(getAllMaterials());
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="w-[96%] lg:max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-6">Create Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="pricePerUnit"
              className="block text-sm font-medium text-gray-700"
            >
              Price Per Unit
            </label>
            <input
              type="number"
              id="pricePerUnit"
              {...register("pricePerUnit", { valueAsNumber: true })}
              className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.pricePerUnit ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter price per unit"
            />
            {errors.pricePerUnit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pricePerUnit.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="rawMaterials"
              className="block text-sm font-medium text-gray-700"
            >
              Raw Materials
            </label>
            <Select
              id="rawMaterials"
              isMulti
              options={materials.map((material) => ({
                value: material.name,
                label: material.name,
              }))}
              onChange={handleMaterialChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            {errors.rawMaterials && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rawMaterials.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-sm text-sm bg-[#213555] hover:bg-[#3E5879] text-white py-3 rounded-md focus:outline-none focus:ring-2"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader loading={loading} color={"white"} size={12} />
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

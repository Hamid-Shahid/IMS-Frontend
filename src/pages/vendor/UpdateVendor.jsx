import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { getVendorById, updateVendor } from "../../services/vendor";
import { ClipLoader } from "react-spinners";
import { getAllMaterials } from "../../services/material";
import { useNavigate, useParams } from "react-router-dom";
import { vendorSchema } from "../../validations";

const UpdateVendor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, vendor } = useSelector((state) => state.vendor);
  const { materials } = useSelector((state) => state.material);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      address: "",
      materials: [{ name: "", costPerUnit: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const onSubmit = async (vendor) => {
    dispatch(updateVendor({ id, vendor }))
      .unwrap()
      .then(() => navigate("/vendor"))
      .catch((error) => {
        console.error("Error in updating vendor:", error.message);
      });
  };

  useEffect(() => {
    if (vendor) {
      reset({
        name: vendor.name || "",
        contact: vendor.contact || "",
        email: vendor.email || "",
        address: vendor.address || "",
        materials: vendor.materials.map((material) => ({
          name: material.name || "",
          costPerUnit: material.costPerUnit || "",
        })) || [{ name: "", costPerUnit: "" }],
      });
    }
  }, [vendor, reset]);

  useEffect(() => {
    dispatch(getVendorById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getAllMaterials());
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="w-[96%] min-h-[400px] lg:max-w-lg mx-auto p-6 bg-white rounded-md shadow-md my-10">
        <h1 className="text-xl font-bold mb-6">Update Vendor</h1>
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ClipLoader loading={loading} color={"blue"} size={50} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Vendor Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                placeholder="Enter vendor name"
                {...register("name")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-[0.8rem] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact
              </label>
              <input
                type="text"
                placeholder="Enter contact number"
                {...register("contact")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <p className="text-red-500 text-[0.8rem] mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-[0.8rem] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                placeholder="Enter address"
                {...register("address")}
                rows="2"
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-[0.8rem] mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Materials */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materials
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className="mb-3 flex items-center gap-4">
                  <select
                    {...register(`materials.${index}.name`)}
                    className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.materials?.[index]?.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select Material
                    </option>
                    {materials.map((material, idx) => (
                      <option key={idx} value={material.name}>
                        {material.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Cost per unit"
                    {...register(`materials.${index}.costPerUnit`, {
                      valueAsNumber: true,
                    })}
                    className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.materials?.[index]?.costPerUnit
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ name: "", costPerUnit: "" })}
                className="text-sm hover:text-[#213555]"
              >
                + Add Material
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-sm text-sm bg-[#213555] hover:bg-[#3E5879] text-white py-3 rounded-md focus:outline-none focus:ring-2"
            >
              {loading ? (
                <ClipLoader loading={loading} color={"white"} size={12} />
              ) : (
                "Update Vendor"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateVendor;

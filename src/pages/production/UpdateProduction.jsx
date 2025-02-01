import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { getProductionById, updateProduction } from "../../services/production";
import { ClipLoader } from "react-spinners";
import { getAllProducts } from "../../services/product";
import { createProductionSchema } from "../../validations";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, production } = useSelector((state) => state.production);
  const { products } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(createProductionSchema),
    defaultValues: {
      productName: "",
      noOfUnitsProduced: 0,
      quantityOfRawMaterials: [{ rawMaterialName: "", quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quantityOfRawMaterials",
  });

  const onSubmit = async (production) => {
    dispatch(updateProduction({ id, production }))
      .unwrap()
      .then(() => navigate("/production"))
      .catch((error) => {
        console.error("Error in updating production:", error.message);
      });
  };

  useEffect(() => {
    if (id) {
      dispatch(getAllProducts());
      dispatch(getProductionById(id));
    }
  }, [id]);

  useEffect(() => {
    if (production) {
      reset({
        productName: production.productName || "",
        noOfUnitsProduced: production.noOfUnitsProduced || 0,
        quantityOfRawMaterials: production.quantityOfRawMaterials.map(
          (material) => ({
            rawMaterialName: material.rawMaterialName || "",
            quantity: material.quantity || 0,
          })
        ) || [{ rawMaterialName: "", quantity: 0 }],
      });
    }
  }, [production, reset]);

  const selectedProductName = watch("productName");
  const selectedProduct = products.find(
    (product) => product.name === selectedProductName
  );
  const rawMaterials = selectedProduct ? selectedProduct.rawMaterials : [];

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="w-[96%] min-h-[400px] lg:max-w-lg mx-auto p-6 bg-white rounded-md shadow-md my-10">
        <h1 className="text-xl font-bold mb-6">Update Production</h1>

        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ClipLoader loading={loading} color={"blue"} size={50} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <select
                {...register("productName")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Product
                </option>
                {products?.map((product) => (
                  <option key={product._id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
              {errors.productName && (
                <p className="text-red-500 text-[0.8rem] mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Number of Units Produced */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Units Produced
              </label>
              <input
                type="number"
                placeholder="Enter number of units produced"
                {...register("noOfUnitsProduced", { valueAsNumber: true })}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.noOfUnitsProduced
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.noOfUnitsProduced && (
                <p className="text-red-500 text-[0.8rem] mt-1">
                  {errors.noOfUnitsProduced.message}
                </p>
              )}
            </div>

            {/* Raw Materials */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raw Materials & quantity
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className="mb-3 flex items-center gap-4">
                  <select
                    {...register(
                      `quantityOfRawMaterials.${index}.rawMaterialName`
                    )}
                    className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.quantityOfRawMaterials?.[index]?.rawMaterialName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={!selectedProductName}
                  >
                    <option value="" disabled>
                      Select Raw Material
                    </option>
                    {rawMaterials.map((material, idx) => (
                      <option key={idx} value={material.name}>
                        {material.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Quantity"
                    {...register(`quantityOfRawMaterials.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.quantityOfRawMaterials?.[index]?.quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={!selectedProductName}
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
                onClick={() => append({ rawMaterialName: "", quantity: 0 })}
                className="text-sm hover:text-[#213555]"
                disabled={!selectedProductName} // Disable if no product is selected
              >
                + Add Raw Material
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-sm text-sm bg-[#213555] hover:bg-[#3E5879] text-white py-3 rounded-md focus:outline-none focus:ring-2"
            >
              {loading ? (
                <ClipLoader loading={loading} color={"white"} size={12} />
              ) : (
                "Update Production"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProduction;

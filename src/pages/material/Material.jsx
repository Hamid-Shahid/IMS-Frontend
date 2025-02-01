import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMaterial, getAllMaterials } from "../../services/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import NotFound from "../../components/NotFound";

const Material = () => {
  const dispatch = useDispatch();
  const { materials, loading } = useSelector((state) => state.material);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState(null);

  const filteredMaterials = materials.filter((material) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      material?.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      material?.stock.toString().includes(lowerCaseSearchTerm) ||
      material?.unit.toLowerCase().includes(lowerCaseSearchTerm) ||
      material?.threshold.toString().includes(lowerCaseSearchTerm) ||
      material?.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      (material?.isLowStock ? "Low Stock" : "In Stock")
        .toLowerCase()
        .includes(lowerCaseSearchTerm)
    );
  });

  function handleDelete(id) {
    setShowModal(!showModal);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteMaterial(deletedId));
    setShowModal(!showModal);
  }

  useEffect(() => {
    dispatch(getAllMaterials());
  }, [dispatch]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {loading && <Loader />}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-cogs mr-2 text-[#213555]"></i>
            Stocks
          </div>
          <Link to={"/add-material"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1 "></i>
              <p>Add Raw Material</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Material by any field"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {[
                "SR#",
                "Name",
                "Stock",
                "Unit",
                "Threshold",
                "Stock",
                "Description",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="text-[0.92rem] py-3 px-4 border-b border-secondary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredMaterials.length > 0 &&
              filteredMaterials.map((material, index) => (
                <tr
                  key={material._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {material.name}
                  </td>
                  <td className="py-3 pl-6 border-b border-secondary">
                    {material.stock}
                  </td>
                  <td className="py-3 pl-6 border-b border-secondary">
                    {material.unit}
                  </td>
                  <td className="py-3 pl-10 border-b border-secondary">
                    {material.threshold}
                  </td>
                  <td
                    className={`py-3 px-4 border-b border-secondary font-semibold ${
                      material.isLowStock ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {material.isLowStock ? "Low Stock" : "In Stock"}
                  </td>

                  <td className="py-3 px-4 border-b border-secondary">
                    {material.description}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/edit-material/${material._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(material._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && filteredMaterials.length === 0 && (
          <NotFound message={"material"} />
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} isConfirm={confirmation} />
      )}
    </section>
  );
};

export default Material;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduction, getProductionsByPagination } from "../../services/production";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import NotFound from "../../components/NotFound";

const Production = () => {
  const dispatch = useDispatch();
  const { 
    productions, 
    loading, 
    paginationLoading, 
    currentPage, 
    totalPages 
  } = useSelector((state) => state.production);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getProductionsByPagination({ page, limit }));
  }, [dispatch, page]);

  const filteredProductions = productions.filter((production) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      production?.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
      production?.noOfUnitsProduced.toString().includes(lowerCaseSearchTerm) ||
      production?.quantityOfRawMaterials.some((rawMaterial) =>
        rawMaterial?.rawMaterialName.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  });

  function handleDelete(id) {
    setShowModal(true);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteProduction(deletedId));
    setShowModal(false);
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {/* {paginationLoading && <Loader />} */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-clipboard-list mr-2 text-[#213555]"></i>
            Productions
          </div>
          <Link to={"/add-production"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1 "></i>
              <p>Add production</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search by product name, units, or raw materials"
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
                "Product Name",
                "No Of Unit Produced",
                "Quantity Of Raw Material",
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
            {filteredProductions.length > 0 &&
              filteredProductions.map((production, index) => (
                <tr
                  key={production.productionId}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {production.productName}
                  </td>
                  <td className="py-3 pl-14 border-b border-secondary">
                    {production.noOfUnitsProduced}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {production.quantityOfRawMaterials
                      .map((rawMaterial) => rawMaterial.rawMaterialName)
                      .join(", ")}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/edit-production/${production.productionId}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(production.productionId)}
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

        {!paginationLoading && filteredProductions.length === 0 && (
          <NotFound message={"production"} />
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#213555] hover:bg-[#3E5879] text-gray-100 rounded-md"
        >
          Prev
        </button>
        <span className="py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#213555] hover:bg-[#3E5879] text-gray-100 rounded-md"
        >
          Next
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} isConfirm={confirmation} />
      )}
    </section>
  );
};

export default Production;
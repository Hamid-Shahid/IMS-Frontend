import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProductsByPagination } from "../../services/product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import NotFound from "../../components/NotFound";

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading, currentPage, totalPages, paginationLoading } = useSelector((state) => state.product);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getProductsByPagination({ page, limit }));
  }, [dispatch, page]);

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      product?.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product?.quantity.toString().includes(lowerCaseSearchTerm) ||
      product?.pricePerUnit.toString().includes(lowerCaseSearchTerm) ||
      product?.rawMaterials.some((material) =>
        material?.name.toLowerCase().includes(lowerCaseSearchTerm)
    )
    );

  });

  function handleDelete(id) {
    setShowModal(true);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteProduct(deletedId));
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
            <i className="fas fa-cube mr-2 text-[#213555]"></i>
            Products
          </div>
          <Link to={"/add-product"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1 "></i>
              <p>Add products</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Product by any field"
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
                "Quantity",
                "Price Per Unit",
                "Raw Materials",
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
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {product.name}
                  </td>
                  <td className="py-3 pl-10 border-b border-secondary">
                    {product.quantity}
                  </td>
                  <td className="py-3 pl-11 border-b border-secondary">
                    {product.pricePerUnit}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {product.rawMaterials
                      .map((material) => material.name)
                      .join(", ")}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/edit-product/${product._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
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

        {!paginationLoading && filteredProducts.length === 0 && (
          <NotFound message={"product"} />
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
export default Product;
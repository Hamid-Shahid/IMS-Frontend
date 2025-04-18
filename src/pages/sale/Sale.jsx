import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSale, getSalesByPagination } from "../../services/sale";
import NotFound from "../../components/NotFound";

const Sale = () => {
  const dispatch = useDispatch();
  const { sales, loading, currentPage, totalPages, totalSales } = useSelector(
    (state) => state.sale
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filteredSales = sales.filter((sale) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    const formattedDate = new Date(sale.createdAt).toLocaleDateString("en-GB"); // Formats as dd/mm/yyyy
  
    return (
      sale?.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale?.customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale?.noOfUnitsSold.toString().includes(lowerCaseSearchTerm) ||
      sale?.totalSale.toString().includes(lowerCaseSearchTerm) ||
      sale?.pricePerUnit.toString().includes(lowerCaseSearchTerm) ||
      formattedDate.includes(lowerCaseSearchTerm) // Search by date
    );
  });

  function handleDelete(id) {
    setShowModal(true);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteSale(deletedId));
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(getSalesByPagination({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {/* {loading && <Loader />} */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-chart-line mr-2 text-[#213555]"></i>
            Sales
          </div>

          <Link to={"/add-sale"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1"></i>
              <p>Add Sale</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Sale by product, customer, or amount"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {["SR#", "Product Name", "Customer Name", "Units Sold", "Total Sales", "Price Per Unit", "Date/Time", "Actions"].map(
                (header) => (
                  <th key={header} className="text-[0.92rem] py-3 px-4 border-b border-secondary">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 &&
              filteredSales.map((sale, index) => (
                <tr key={sale.saleId} className="odd:bg-gray-200 hover:bg-gray-300">
                  <td className="py-3 px-4 border-b border-secondary">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-secondary">{sale.productName}</td>
                  <td className="py-3 px-4 border-b border-secondary">{sale.customerName}</td>
                  <td className="py-3 px-4 border-b border-secondary">{sale.noOfUnitsSold}</td>
                  <td className="py-3 px-4 border-b border-secondary">{sale.totalSale}</td>
                  <td className="py-3 px-4 border-b border-secondary">{sale.pricePerUnit}</td>
                  <td className="py-3 px-4 border-b border-secondary">{new Date(sale.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })}</td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/edit-sale/${sale.saleId}`}>
                      <button className="text-green-500 hover:text-green-400" title="Edit">
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(sale.saleId)} className="text-red-500 hover:text-red-400" title="Delete">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!loading && filteredSales.length === 0 && <NotFound message={"sale"} />}
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

      {showModal && <Modal onClose={() => setShowModal(false)} isConfirm={confirmation} />}
    </section>
  );
};

export default Sale;

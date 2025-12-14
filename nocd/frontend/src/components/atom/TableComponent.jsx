const TableComponent = ({ tableData, currentPage = 1, itemsPerPage = 20 }) => {

  const getRowNumber = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  return (
    <div className="overflow-x-auto max-h-[400px] w-full mb-3 bg-base-200 border border-nocd/50 rounded-lg">
      {tableData && tableData.length > 0 ? (
        <table className="table table-md table-pin-rows">
          <thead>
            <tr>
              <th >#</th>
              <th>Node 1</th>
              <th>Node 2</th>
              <th>Combine Score</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping data array untuk membuat baris tabel */}
            {tableData && tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <th>{getRowNumber(index)}</th>
                  <td>{row.Node1}</td>
                  <td>{row.Node2}</td>
                  <td>{row.Combine_Score.toFixed(3)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Tidak ada data interaksi yang ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <table className="table table-md table-pin-rows">
          <thead>
            <tr>
              <th>#</th>
              <th>Node 1</th>
              <th>Node 2</th>
              <th>Combine Score</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping data array untuk membuat baris tabel */}
            {tableData && tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{getRowNumber(index)}</td>
                  <td>{row.Node1}</td>
                  <td>{row.Node2}</td>
                  <td>{row.Combine_Score.toFixed(3)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Tidak ada data interaksi yang ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}


    </div>
  );
};

export default TableComponent;
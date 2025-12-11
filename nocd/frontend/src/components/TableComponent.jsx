import React from 'react';

const TableComponent = ({ tableData }) => {
  console.log(tableData)
  return (
    <div id="tabel-tsv" className="overflow-x-auto">
      <table className="table">
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
                <th>{index + 1}</th>
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
    </div>
  );
};

export default TableComponent;
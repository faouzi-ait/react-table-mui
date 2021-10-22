import React, { useState } from "react";
import { useTable } from "react-table";

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Checkbox } from "./CheckBox";

function DataTable({ columns, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ["id", "last_name"],
    },
  });

  const filteredColumns = allColumns.filter((item) => item.isVisible === true);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
      <div>
        <div className="labels" onClick={() => setIsOpen(!isOpen)}>
          {filteredColumns.map((item) => (
            <span
              className="badges"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                item.toggleHidden(true);
              }}
            >
              <span>{item.Header}</span>
              <span style={{ position: "absolute", top: '-1px', right: '2px' }}>x</span>
            </span>
          ))}
        </div>
        {isOpen && (
          <div className="dropdown-content">
            <ul>
              {allColumns.map((col) => (
                <li key={col.id}>
                  <Checkbox
                    {...col.getToggleHiddenProps()}
                    label={col.Header}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="app">
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </div>
    </div>
  );
}

export default DataTable;

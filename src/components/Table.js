import React from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';

// import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { GlobalFilter } from './GlobalFilter';
import { Checkbox } from './CheckBox';

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '0px',
  },
});

function DataTable({ columns, data }) {
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div style={{ display: 'grid', gridTemplateColumns: '10% 1fr' }}>
        <div style={{ margin: '0 auto' }}>
          <label>
            <Checkbox {...getToggleHideAllColumnsProps()} />
            Toggle All
          </label>
          {allColumns.map((col) => (
            <div key={col.id}>
              <label>
                <Checkbox {...col.getToggleHiddenProps()} />
                {col.Header}
              </label>
            </div>
          ))}
        </div>
        <div className="app">
          <MaUTable {...getTableProps()} className={classes.table}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span>&#x2191;</span>
                        ) : (
                          <span>&#x2193;</span>
                        )
                      ) : (
                        ''
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaUTable>
          <div style={{ marginTop: '1.5rem' }}>
            <span>
              <strong>
                Page {pageIndex + 1} of {pageOptions.length} |
              </strong>
            </span>{' '}
            <span>
              Go To Page{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: '30px' }}
              />
            </span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              {'>>'}
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}>
              {[10, 15, 20, 25, 30].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTable;

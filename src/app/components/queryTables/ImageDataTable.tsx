import React, { useMemo, useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import styles from '@app/components/queryTables/ImageDataTable.module.scss'
// import axios from 'axios'
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination
} from 'react-table'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { API_ROOT } from '@app/utils/environments'

import { TableComposable, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table';
import { Checkbox } from '@patternfly/react-core';

interface columnDetails {
  Header: string,
  accessor: string
}

interface IImageDataTableProps {
  endpoint: string,
  tableColumns: Array<{}>,
  queryId: string
}

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  setFilter,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize },
}) => {
  const [filterInput, setFilterInput] = useState("")

  const handleFilterChange = e => {
    const value = e.target.value || undefined
    setFilter("name", value)
    setFilterInput(value)
  }
  return (
    <div>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <table className={styles.tableWrapper} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "sort-desc"
                      : "sort-asc"
                    : ""
                }>{column.render('Header')}</th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(
                    cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    }
                  )
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const TableInstance = ({ tableData, tableColumns }) => {
  const [columns, data] = useMemo(
    () => {
      return [
        tableColumns,
        tableData
      ]
    },
    [tableData]
  )

  const tableInstance = useTable({ columns, data },
    useFilters, useSortBy, usePagination)

  return (
    <TableLayout {...tableInstance} />
  )
}

const TableQuery = ({endpoint,
  queryId,
  tableColumns}) => {
  //const queryClient = useQueryClient()

  const [tableData, setTableData] = useState(null)


  // const {
  //   data: apiResponse, isLoading
  // } = useQuery(queryId, () => axios.get(`http://54.242.191.234:80/api/${endpoint}`), { enabled: !tableData });

  // useEffect(() => {
  //   setTableData(apiResponse?.data);
  // }, [apiResponse])

  useEffect(() => {
    import('./test-idx.json').then(data => {
      setTableData(data["index"])
    })
    // console.log("FIRED!")
    // fetch("./test-idx.json")
    //   .then(response => {
    //     const data = response.json()
    //     setTableData(data["index"])
    //   })
    //   .then(data => {
    //     console.log(data)
    //   })
  }, [])

  if (!tableData) {
    return <div>Fetching Image Data...</div>
  }

  return (
    <span>
      <TableInstance tableData={tableData} tableColumns={tableColumns}/>

    </span>
  )
}


const client = new QueryClient()

export default class ImageDataTable extends React.Component<IImageDataTableProps> {
  render () {
    const {
      endpoint,
      tableColumns,
      queryId
    } = this.props

    return (
      <QueryClientProvider client={client}>
        <TableQuery endpoint={endpoint} tableColumns={tableColumns} queryId={queryId} />
      </QueryClientProvider>
    )
  }
}

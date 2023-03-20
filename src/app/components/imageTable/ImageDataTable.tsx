import React, { useMemo, useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
// import {
//   useTable,
//   useFilters,
//   useSortBy,
//   usePagination
// } from 'react-table'
import { TableComposable, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table'
import { Checkbox } from '@patternfly/react-core'

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
  data,
  columns
}) => {
  // const [expandedRows, setExpandedRowNames] = useState<string[]>()
  // const setRowExpanded = (row: Row, isExpanding = true) =>
  //   setExpandedRowNames(prevExpanded => {
  //     const otherExpandedRepoNames = prevExpanded.filter(r => r !== repo.name);
  //     return isExpanding ? [...otherExpandedRepoNames, repo.name] : otherExpandedRepoNames;
  //   });
  // const isRepoExpanded = (repo: Repository) => expandedRepoNames.includes(repo.name);

  // const [isExampleCompact, setIsExampleCompact] = React.useState(true);

  return (
    <React.Fragment>
      <Checkbox
        label="Compact"
        // isChecked={isExampleCompact}
        // onChange={checked => setIsExampleCompact(checked)}
        aria-label="toggle compact variation"
        id="toggle-compact"
        name="toggle-compact"
        />
        {/* </React.Fragment>variant={isExampleCompact ? 'compact' : undefined}> */}
        <TableComposable aria-label="Expandable table">
        <Thead>
          <Tr>
            <Th />
            {columns.map((col, _colIndex) => {
              {console.log(col)}
              return (
                <Th>{col.Header}</Th>
              )
            })}
          </Tr>
        </Thead>
        {/* isExpanded={isRepoExpanded(repo)} */}
        <Tbody>
        {data.map((image, _rowIndex) => {
          return (
              <Tr>
                <Td></Td>
                {columns.map((col, _colIndex) => {
                  return (
                    <Td dataLabel={col.Header}>{image[col.accessor]}</Td>
                  )
                })}
              </Tr>
          )
          })}
          </Tbody>
      </TableComposable>
    </React.Fragment>
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

  // const tableInstance = useTable({ columns, data },
  //   useFilters, useSortBy, usePagination)
    console.log(data)
    console.log(columns)
  return (
    <TableLayout data={data} columns={columns} />
  )
}

const TableQuery = ({tableColumns}) => {

  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    import('./test-idx.json').then(data => {
      setTableData(data["index"])
    })
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

export default class ImageDataTable extends React.Component<IImageDataTableProps> {
  render () {
    const {
      tableColumns,
    } = this.props

    return (
      <TableQuery tableColumns={tableColumns}/>
    )
  }
}

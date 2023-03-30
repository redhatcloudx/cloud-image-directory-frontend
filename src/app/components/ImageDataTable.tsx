import React, { useMemo, useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import { TableComposable, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table'
import { Pagination, PaginationVariant } from '@patternfly/react-core'
import DetailsView from './DetailsView'

interface columnDetails {
  Header: string,
  accessor: string
}

interface IImageDataTableProps {
  tableColumns: Array<{}>,
}

const TableLayout = ({
  data,
  columns
}) => {
  const [expandedRows, setExpandedRowIds] = useState<string[]>([])
  const [rowDetails, setRowDetails] = useState({})

  const setRowExpanded = (row, isExpanding = true) =>
    setExpandedRowIds(prevExpanded => {
      const otherExpandedRowIds = prevExpanded.filter(r => r !== row.ref)
      const ref = row.ref
      const reference = row.ref
      let fetchedDetails = {}

      fetch(`https://imagedirectory.cloud/images/v1/${reference}`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(details => {
          fetchedDetails[ref] = details
          setRowDetails(rowDetails => ({
            ...rowDetails,
            ...fetchedDetails
          }))
        })
      return isExpanding ? [...otherExpandedRowIds, row.ref] : otherExpandedRowIds
    })

  const isRowExpanded = (row) => expandedRows.includes(row.ref)

  return (
    <React.Fragment>
      <TableComposable aria-label="Expandable table">
        <Thead>
          <Tr>
            <Th />
            {columns.map((col, _colIndex) => {
              return (
                <Th>{col.Header}</Th>
              )
            })}
          </Tr>
        </Thead>
        {data.map((row, rowIndex) => {
          return (
            <Tbody key={`Row ${row.ref}`} isExpanded={isRowExpanded(row)}>
              <Tr>
                <Td
                  expand={
                    row.ref &&
                    {
                      rowIndex,
                      isExpanded: isRowExpanded(row),
                      onToggle: () => setRowExpanded(row, !isRowExpanded(row)),
                      expandId: 'composable-expandable-example'
                    }
                  }
                />
                {columns.map((col, _colIndex) => {
                  return (
                    <Td dataLabel={col.Header}>{row[col.accessor]}</Td>
                  )
                })}
              </Tr>
              {row.ref && (
                <Tr isExpanded={isRowExpanded(row)}>
                  <Td dataLabel={`Repo detail ${row.ref}`} noPadding={false} colSpan={4}>
                    <ExpandableRowContent>
                      {rowDetails[row.ref] ?
                        <DetailsView
                          details={{
                            ...rowDetails[row.ref],
                            'provider': row['provider']
                          }}
                        />
                        : <div>Loading ...</div>}
                    </ExpandableRowContent>
                  </Td>
                </Tr>
              )}
            </Tbody>
          )
        })}

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

  return (
    <TableLayout data={data} columns={columns} />
  )
}

const TableQuery = ({ tableData, tableColumns }) => {
  if (!tableData) {
    return <div>Fetching Image Data...</div>
  }

  return (
    <span>
      <TableInstance tableData={tableData} tableColumns={tableColumns} />
    </span>
  )
}

const ImageDataTable = ({ tableColumns, pathPrefix }) => {
  const [page, setPage] = React.useState(1)
  const [tableData, setTableData] = useState(null)
  const [index, setIndex] = useState({})

  useEffect(() => {
    loadData(page)
    loadIndex()
  }, [])

  const loadIndex = () => {
    fetch(`${pathPrefix}/pages`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => {
        setIndex(data)
      })
  }

  const loadData = (newPage) => {
    // -1 is necessary as our index files start at 0 the react table at 1
    fetch(`${pathPrefix}/${newPage - 1}`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => {
        setTableData(data)
      })
  }

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage)
    loadData(newPage)
  }

  return (
    <div>
      <Pagination
        perPageComponent="button"
        itemCount={index['last']}
        widgetId="top-pagination"
        page={page}
        variant={PaginationVariant.top}
        onSetPage={onSetPage}
        perPageOptions={[{
          title:index['entries'],
          value:index['entries']
        }]}
        perPage={index['entries']}
      />
      <TableQuery tableColumns={tableColumns} tableData={tableData} />
      <Pagination
        perPageComponent="button"
        itemCount={index['last']}
        widgetId="bottom-pagination"
        page={page}
        variant={PaginationVariant.bottom}
        onSetPage={onSetPage}
        perPage={index['entries']}
      />
    </div>
  )
}

export default ImageDataTable

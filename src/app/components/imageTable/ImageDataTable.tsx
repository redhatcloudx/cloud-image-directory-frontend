import React, { useMemo, useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import { TableComposable, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table'
import { Checkbox } from '@patternfly/react-core'
import DetailsView from '../detailsView/DetailsView'

interface columnDetails {
  Header: string,
  accessor: string
}

interface IImageDataTableProps {
  tableColumns: Array<{}>,
  provider: string
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

      fetch(`https://cloudx-json-bucket.s3.amazonaws.com/images/v1/${reference}`, {
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
                      row.ref
                      ? {
                          rowIndex,
                          isExpanded: isRowExpanded(row),
                          onToggle: () => setRowExpanded(row, !isRowExpanded(row)),
                          expandId: 'composable-expandable-example'
                        }
                      : undefined
                  }
                />
                {columns.map((col, _colIndex) => {
                  return (
                    <Td dataLabel={col.Header}>{row[col.accessor]}</Td>
                  )
                })}
              </Tr>
              {row.ref ? (
                <Tr isExpanded={isRowExpanded(row)}>
                  <Td dataLabel={`Repo detail ${row.ref}`} noPadding={false} colSpan={4}>
                      <ExpandableRowContent>
                        { rowDetails[row.ref] ?
                            <DetailsView
                                  imageID={rowDetails[row.ref]['imageId']}
                                  majorRelease={rowDetails[row.ref]['version']}
                                  architecture={rowDetails[row.ref]['arch']}
                                  name={rowDetails[row.ref]['name']}
                                  region={rowDetails[row.ref]['region']}
                                  date={rowDetails[row.ref]['date']}
                                  url={rowDetails[row.ref]['ref']}
                            />
                          : <div>Loading ...</div>
                        }
                        {/* {JSON.stringify(rowDetails[row.ref], null, 2)} */}
                      </ExpandableRowContent>
                  </Td>
                </Tr>
              ) : null}
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

const TableQuery = ({ tableColumns, provider }) => {

  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    fetch("https://poc.imagedirectory.cloud/images/v1/idx/list/sort-by-date/1", {
      method: 'get',
    })
    .then(res => res.json())
    .then(data => {
      setTableData(data)
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
      provider
    } = this.props

    return (
      <TableQuery tableColumns={tableColumns} provider={provider}/>
    )
  }
}

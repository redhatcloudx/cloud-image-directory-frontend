import * as React from 'react';
import { Card, PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/queryTables/ImageDataTable'
import AzureImageModal from '@app/components/modals/AzureImageModal'
import azure_logo from '@app/bgimages/azure_clear.png'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'

const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Version',
    accessor: 'version'
  },
  {
    Header: 'Architecture',
    accessor: 'arch'
  },
  {
    Header: 'Virtualization',
    accessor: 'virt'
  },
  {
    Header: 'Urn',
    accessor: 'imageId',
    Cell: ({ cell: { value } }) => {
      return (
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact">
            {value}
        </ClipboardCopy>
      )
    }
  },
  {
    Header: 'Date',
    accessor: 'date'
  },
  {
    Header: 'Action',
    Cell: ({
      cell: {
        value
      },
      row: {
        values: {
          name,
          arch,
          imageId,
          version,
          date
        }
      }
    }) => {
      return (
        <AzureImageModal
          urn={imageId}
          majorRelease={version}
          architecture={arch}
          version={version} />
      )
    }
  }
]

const Azure: React.FunctionComponent<{title: string}> = ({title}) => {

  useDocumentTitle(title)
  return (
    <>
      <PageSection variant={PageSectionVariants.darker}>
        <Bullseye>
          <img src={azure_logo}
          style={{
            height: 400,
          }}></img>
          <Title headingLevel="h1"  size={TitleSizes['4xl']}>Azure Image Browser</Title>
        </Bullseye>
      </PageSection>
        <ImageDataTable
            endpoint={'azure'}
            queryId={'azureImageDataQuery'}
            tableColumns={columns}/>
      <PageSection >
        <Bullseye>
          <Text component={TextVariants.small}>{`Copyright © Red Hat ${new Date().getFullYear()}.`}</Text>
        </Bullseye>
      </PageSection>
    </>
  )
}


export { Azure }

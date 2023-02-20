import * as React from 'react';
import { PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/queryTables/ImageDataTable'
import GCPImageModal from '@app/components/modals/GCPImageModal'
import google_clear from '@app/bgimages/google_clear.png'
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
    Header: 'ID',
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
    accessor: 'date',
  },
  {
    Header: 'Action',
    accessor: 'selflink',
    Cell: ({
      cell: {
        value
      },
      row: {
        values: {
          arch,
          imageId,
          version,
          date
        }
      }
    }) => {
      return (
        <GCPImageModal
          imageID={imageId}
          majorRelease={version}
          architecture={arch}
          date={date}
          url={value}/>
      )
    }
  }
]

const GCP: React.FunctionComponent<{title: string}> = ({title}) => {

  useDocumentTitle(title)
  return (
    <>
      <PageSection variant={PageSectionVariants.darker}>
        <Bullseye>
          <img src={google_clear}
            style={{
              height: 400,
            }}></img>
          <Title headingLevel="h1"  size={TitleSizes['4xl']}>Google Cloud Image Browser</Title>
        </Bullseye>
      </PageSection>
      <ImageDataTable
        endpoint={'google'}
        queryId={'gcpImageDataQuery'}
        tableColumns={columns}/>
      <PageSection >
        <Bullseye>
          <Text component={TextVariants.small}>{`Copyright © Red Hat ${new Date().getFullYear()}.`}</Text>
        </Bullseye>
      </PageSection>
    </>
  )
}

export { GCP }

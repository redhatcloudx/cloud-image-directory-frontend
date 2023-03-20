import * as React from 'react';
import { Card, PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/imageTable/ImageDataTable'
import aws_logo from '@app/bgimages/aws_clear.png'
import AWSImageModal from '@app/components/modals/AWSImageModal'
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
    Header: 'Region',
    accessor: 'region'
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
    accessor: 'date'
  },
  // {
  //   Header: 'Action',
  //   accessor: 'selflink',
  //   Cell: ({
  //     cell: {
  //       value
  //     },
  //     row: {
  //       values: {
  //         name,
  //         region,
  //         arch,
  //         imageId,
  //         version,
  //         date
  //       }
  //     }
  //   }) => {
  //     return (
  //       <AWSImageModal
  //         architecture={arch}
  //         date={date}
  //         imageID={imageId}
  //         majorRelease={version}
  //         name={name}
  //         region={region}
  //         url={value}/>
  //     )
  //   }
  // },
]

const AWS: React.FunctionComponent<{title: string}> = ({title}) => {

  useDocumentTitle(title)
  return (
    <>
      <PageSection variant={PageSectionVariants.darker}>
        <Bullseye>
          <img src={aws_logo}
          style={{
            height: 400,
          }}></img>
          <Title headingLevel="h1"  size={TitleSizes['4xl']}>AWS Image Browser</Title>
        </Bullseye>
      </PageSection>
      <ImageDataTable
            endpoint={'aws'}
            queryId={'awsImageDataQuery'}
            tableColumns={columns}/>
      <PageSection >
        <Bullseye>
          <Text component={TextVariants.small}>{`Cloud Experience ${new Date().getFullYear()}.`}</Text>
        </Bullseye>
      </PageSection>
    </>
  )
}

export { AWS }

import * as React from 'react';
import { PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/ImageDataTable'
import GCPImageModal from '@app/components/modals/GCPImageModal'
import google_clear from '@app/bgimages/google_clear.png'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'

const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Architecture',
    accessor: 'arch'
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
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
      <ImageDataTable tableColumns={columns} pathPrefix={'https://cloudx-json-bucket.s3.amazonaws.com/images/v1/idx/list/sort-by-date-google'}/>
      <PageSection >
        <Bullseye>
          <Text component={TextVariants.small}>{`Cloud Experience ${new Date().getFullYear()}.`}</Text>
        </Bullseye>
      </PageSection>
    </>
  )
}

export { GCP }

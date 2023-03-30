import * as React from 'react';
import { PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/ImageDataTable'
import google_clear from '@app/bgimages/google_clear.png'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'

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

const GCP: React.FunctionComponent<{ title: string }> = ({ title }) => {

  useDocumentTitle(title)
  return (
    <>
      <PageSection variant={PageSectionVariants.darker}>
        <Bullseye>
          <img src={google_clear}
            style={{
              height: 400,
            }}></img>
          <Title headingLevel="h1" size={TitleSizes['4xl']}>Google Cloud Image Browser</Title>
        </Bullseye>
      </PageSection>
      <ImageDataTable tableColumns={columns} pathPrefix={'https://imagedirectory.cloud/images/v1/idx/list/sort-by-date-google'} />
      <Footer />
    </>
  )
}

export { GCP }

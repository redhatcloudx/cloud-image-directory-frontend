import * as React from 'react';
import { Card, PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/ImageDataTable'
import azure_logo from '@app/bgimages/azure_clear.png'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'

const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Region',
    accessor: 'region'
  },
  {
    Header: 'Architecture',
    accessor: 'arch'
  },
  {
    Header: 'Date',
    accessor: 'date'
  },
]

const Azure: React.FunctionComponent<{ title: string }> = ({ title }) => {

  useDocumentTitle(title)
  return (
    <>
      <PageSection variant={PageSectionVariants.darker}>
        <Bullseye>
          <img src={azure_logo}
            style={{
              height: 400,
            }}></img>
          <Title headingLevel="h1" size={TitleSizes['4xl']}>Azure Image Browser</Title>
        </Bullseye>
      </PageSection>
      <ImageDataTable tableColumns={columns} pathPrefix={'https://imagedirectory.cloud/images/v1/idx/list/sort-by-date-azure'} />
      <Footer />
    </>
  )
}


export { Azure }

import * as React from 'react';
import { Card, PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/ImageDataTable'
import aws_logo from '@app/bgimages/aws_clear.png'
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
    accessor: 'date'
  },
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
      <ImageDataTable tableColumns={columns} pathPrefix={'https://poc.imagedirectory.cloud/images/v1/idx/list/sort-by-date-aws/1'}/>
      <PageSection >
        <Bullseye>
          <Text component={TextVariants.small}>{`Cloud Experience ${new Date().getFullYear()}.`}</Text>
        </Bullseye>
      </PageSection>
    </>
  )
}

export { AWS }

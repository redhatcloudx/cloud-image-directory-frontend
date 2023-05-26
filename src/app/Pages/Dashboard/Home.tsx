import * as React from 'react'
import {
  PageSectionVariants, PageSection, Title, Bullseye, TitleSizes, Text, TextVariants,
} from '@patternfly/react-core'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'

const Home: React.FunctionComponent<{ title: string }> = ({ title }) => {

  useDocumentTitle(title)
  return (
    <div>
      <PageSection className='hero-section'>
        <Text className='hero-text' component={TextVariants.h1}>
          Text text text
        </Text>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Bullseye>
          <Title headingLevel="h1" size={TitleSizes['4xl']}>Cloud Image Directory</Title>
        </Bullseye>
        <Bullseye>
          <Title headingLevel="h2" size={TitleSizes['1xl']}>Providing Easy Access to Linux Cloud Images Since 2023</Title>
        </Bullseye>
      </PageSection>
      <Footer />
    </div>
  )
}

export { Home }

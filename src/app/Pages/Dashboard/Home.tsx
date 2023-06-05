import * as React from 'react'
import {
  PageSectionVariants,
  PageSection,
  Title,
  Flex,
  FlexItem
} from '@patternfly/react-core'
import {
  useDocumentTitle
} from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'
import logo from '@app/bgimages/ohc-hero.png'

const Home: React.FunctionComponent<{ title: string }> = ({ title }) => {

  useDocumentTitle(title)
  return (
    <div>
      <PageSection className='hero-section'>
        <Flex className='hero-text' alignItems={{
          default: 'alignItemsCenter'
        }}>
          <FlexItem>
            <Title headingLevel='h1' size='3xl'>
              Welcome to Cloud Image Directory
            </Title>
            <Title headingLevel='h1' size='lg'>
              Get the images you need to start developing your Linux on-cloud experience.
            </Title>
          </FlexItem>
          <FlexItem
            spacer={{ default: 'spacer2xl' }}
            align={{ default: 'alignRight' }}>
            <img src={logo} style={{ height: 200 }} />
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
      </PageSection>
      <Footer />
    </div>
  )
}

export { Home }

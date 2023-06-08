import {
  PageSection,
  Text,
  Flex,
  FlexItem,
} from '@patternfly/react-core'
import logo from '@app/bgimages/Logo-Red_Hat-Supported_By-A-Reverse-RGB.svg'

const Footer = () => {
  return (
    <PageSection
      className='footer-section'
      stickyOnBreakpoint={{ default: 'bottom' }}>
      <Flex>
        <FlexItem>
          <img src={logo} style={{ height: 25 }} />
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <Text className='footer-text'>
            <a
              className='footer-link'
              href='mailto: contact@imagedirectory.cloud'>Contact us</a>
            &nbsp; | <a
              className='footer-link'
              target='_blank'
              href='https://github.com/redhatcloudx'>Fork us on Github</a>
            &nbsp; | Disclaimer: This is an experimental project by Red Hat.
          </Text>
        </FlexItem>
      </Flex>
    </PageSection>
  )
}

export default Footer

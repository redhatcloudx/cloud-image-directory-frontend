import {
  Button,
  PageSection,
  Bullseye,
  Text,
  TextVariants,
  TextContent,
  Grid,
  GridItem
} from '@patternfly/react-core'
import Emoji from './Emoji'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <PageSection >
      <Bullseye>
        <Grid hasGutter={true} component='ul'>
          <GridItem component='li'>
              <TextContent>
                Can't find your favorite image <Emoji symbol="💔" /> ?
              </TextContent>
          </GridItem>
          <GridItem component='li'>
            <Bullseye>
              <Button variant="danger">
                  <Link
                    to='#'
                    onClick={(e) => {
                      window.location.href = 'mailto:contact@imagedirectory.cloud'
                      e.preventDefault()
                    }}
                >
                  <Emoji symbol="📨" /> Let us know!
                </Link>
              </Button>
            </Bullseye>
          </GridItem>
          <GridItem component='li'>
            <Bullseye>
              <Text component='small'>{`Cloud Experience ${new Date().getFullYear()}.`}</Text>
            </Bullseye>
          </GridItem>
        </Grid>
      </Bullseye>
    </PageSection>
  )
}

export default Footer
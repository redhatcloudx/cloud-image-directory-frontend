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
      <Grid component='span' hasGutter={true}>
        <GridItem component='span'>
          <Bullseye>
            <TextContent>
              <Text component='h5' className="pf-u-text-align-center">Can't find your favorite image <Emoji symbol="💔" />?</Text>
            </TextContent>
          </Bullseye>
        </GridItem>
        <GridItem>
          <Bullseye>
            <Button variant="danger">
                <Link
                  to='#'
                  onClick={(e) => {
                      window.location.href = 'mailto:contact@imagedirectory.cloud'
                      e.preventDefault()
                  }}
              >
                  <Emoji symbol="📨" /> {'Let us know!'}
              </Link>
            </Button>
          </Bullseye>
        </GridItem>
        <GridItem>
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
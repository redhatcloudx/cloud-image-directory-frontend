import {
  Button,
  PageSection,
  Bullseye,
  Text,
  TextVariants,
  TextContent,
  Grid,
  GridItem,
  Masthead,
  MastheadContent
} from '@patternfly/react-core'
import Emoji from './Emoji'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Masthead>
      <MastheadContent>
        This is going to be the footer
      </MastheadContent>
    </Masthead>
  )
}

export default Footer

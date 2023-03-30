import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  Bullseye,
} from '@patternfly/react-core'
import aws_logo from '@app/bgimages/aws_clear.png'
import azure_logo from '@app/bgimages/azure_clear.png'
import google_logo from '@app/bgimages/google_clear.png'
import redhat_logo from '@app/bgimages/redhat_clear.png'


interface IProviderCardProps {
  name: string
  text: string
  url: string
}

interface IProviderCardState {
  src: string
}

const loadBGImage = (name) => {
  switch ( name ) {
    case 'aws':
      return aws_logo
    case 'azure':
      return azure_logo
    case 'google':
      return google_logo
    case 'redhat':
      return redhat_logo
    default:
      return redhat_logo
 }
}
export default class ProviderCard extends React.Component<IProviderCardProps, IProviderCardState> {
  render () {
    const {
      name,
      text,
      url
    } = this.props

    return (
      <Card
        // isSelectable={true}
        // isRounded={true}
        style={{
          backgroundImage: `url(${loadBGImage(name)})`,
          backgroundPositionY: '40px',
          backgroundPositionX: 'center',
          // backgroundColor: '#232f3e',
          backgroundSize: 160,
          backgroundRepeat: 'no-repeat',
          height: 280,
          width: 200,
        }}
        >
          <CardTitle></CardTitle>
          <CardBody></CardBody>
          <CardFooter>
            <Bullseye>
              <Button component="a" href={url} target="_blank" rel="noreferrer" variant="danger">{text}</Button>
            </Bullseye>
          </CardFooter>
      </Card>
    )
  }
}

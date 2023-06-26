import React from 'react';
import {
  Card,
  CardHeader,
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


export default class ProviderCard extends React.Component<IProviderCardProps, IProviderCardState> {
  render () {
    const {
      name,
      text,
      url
    } = this.props

    return (

    )
  }
}

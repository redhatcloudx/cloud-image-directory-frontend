import React from 'react';
import {
  Title,
  Bullseye,
  Split,
  Flex,
  FlexItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Grid,
  GridItem,
  CardTitle
} from '@patternfly/react-core'

import ProviderCard from "@app/components/ProviderCard";
import ProviderCardProps from "@app/components/ProviderCard";
import redhat_logo from "@app/bgimages/redhat_clear.png";
import aws_logo from "@app/bgimages/aws_clear.png";
import azure_logo from "@app/bgimages/azure_clear.png";
import google_logo from "@app/bgimages/google_clear.png";

interface IProviderInfoProps {
  providerInfos: ProviderCardProps[]
}

const providerInfos = [
  {
    name: 'aws',
    text: 'Launch in AWS ->',
    url: 'https://aws.amazon.com/marketplace/pp/prodview-kv5mi3ksb2mma?sr=0-1&ref_=beagle&applicationId=AWSMPContessa'
  },
  {
    name: 'google',
    text: 'Launch in Google Cloud ->',
    url: 'https://console.cloud.google.com/marketplace/product/rhel-cloud/rhel-9?project=cockpituous'
  },
  {
    name: 'azure',
    text: 'Launch in Azure ->',
    url: 'https://azuremarketplace.microsoft.com/en-us/marketplace/apps/redhat.rhel-20190605?tab=Overview'
  }
]

const loadImage = (name) => {
  switch ( name ) {
    case 'aws':
      return aws_logo
    case 'azure':
      return azure_logo
    case 'google':
      return google_logo
    // case 'redhat':
    //   return redhat_logo
    // default:
    //   return redhat_logo
  }
}

const ExternalLinksCard: React.FunctionComponent = () => {
  return (
    <Flex direction={ {default: 'column'}}  flex={{ default: 'flex_3' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <img*/}
      {/*      src={redhat_logo}*/}
      {/*      style={{*/}
      {/*        //   objectPosition: 'top left',*/}
      {/*        height: '2vw',*/}
      {/*        width: '2vw',*/}
      {/*        // margin: '7% 8%',*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </CardHeader>*/}
      {/*  <CardTitle>Get the latest Red Hat Enterprise Linux certified image for cloud deployment</CardTitle>*/}
      {/*  <Bullseye>*/}
      {/*    <CardBody>*/}
      {/*    Launch the latest RHEL certified cloud image through available cloud service provider marketplaces.*/}
      {/*    <Flex>*/}
      {/*      {*/}
      {/*        providerInfos.map(({name, text, url}, index) => (*/}
      {/*          <FlexItem key={`provider_card_${index}`}>*/}
      {/*            /!*<ProviderCard name={name} text={text} url={url}/>*!/*/}
      {/*            <Card>*/}
      {/*            <CardBody style={{height: 280, width: 200}}><img src={loadImage(name)} />`</CardBody>*/}
      {/*            <CardFooter >*/}
      {/*              <Button component="a" href={url} target="_blank" rel="noreferrer" variant="link">{text}</Button>*/}
      {/*            </CardFooter>*/}
      {/*            </Card>*/}
      {/*          </FlexItem>*/}
      {/*        ))*/}
      {/*      }*/}

      {/*    </Flex>*/}
      {/*  </CardBody>*/}
      {/*</Bullseye>*/}
      {/*</Card>*/}
      {/*</Flex>*/}
      <FlexItem>
        <img
          src={redhat_logo}
          style={{
            //   objectPosition: 'top left',
            height: '2vw',
            width: '2vw',
            // margin: '7% 8%',
          }}
        />
        <br/>
        <Title headingLevel='h1'>Get the latest Red Hat Enterprise Linux certified image for cloud deployment</Title>
        <br/>
        <p>Launch the latest RHEL certified cloud image through available cloud service provider marketplaces.</p>
      </FlexItem>
      <Flex>
      {
        providerInfos.map(({name, text, url}, _) => (

          <>
            <FlexItem key={`provider_card_${name}`}>
              <img style={{ height: 200, width: 200}} src={loadImage(name)} />
              <Bullseye>
                <Button component="a" href={url} target="_blank" rel="noreferrer" variant="link">
                  {text}
                </Button>
              </Bullseye>
            </FlexItem>
          </>
        ))
      }
    </Flex>
    </Flex>
  )
}

export { ExternalLinksCard }
import React from 'react';
import {
  Bullseye, Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
  Flex, FlexItem, Title
} from '@patternfly/react-core'

import ProviderCard from "@app/components/ProviderCard";
import ProviderCardProps from "@app/components/ProviderCard";
import {useDocumentTitle} from "@app/utils/useDocumentTitle";
import redhat_logo from '@app/bgimages/redhat_clear.png'

interface IProviderInfoProps {
  providerInfo: ProviderCardProps
}

const providerInfo = {
  name: 'redhat',
  title: 'Build your own RHEL cloud image',
  description: "With Red Hat's image builder, you can create customizable and repeatable operating system images and server images",
  text: 'Build an image ->',
  url: 'https://console.redhat.com/insights/image-builder'
}

const InternalLinksCard: React.FunctionComponent = () => {
  return (
    // <Flex flex={{ default: 'flex_1' }}/* alignSelf={{ default: 'alignSelfStretch' }}*/>
    //             {/*<ProviderCard name={providerInfo.name} title={providerInfo.title} description={providerInfo.description} text={providerInfo.text} url={providerInfo.url}/>*/}
    //       <Card>
    //         <CardHeader>
    //           <img
    //             src={redhat_logo}
    //             style={{
    //               //   objectPosition: 'top left',
    //               height: '2vw',
    //               width: '2vw',
    //               // margin: '7% 8%',
    //             }}
    //           />
    //         </CardHeader>
    //         <CardTitle>{providerInfo.title}</CardTitle>
    //         <Bullseye>
    //           <CardBody>{providerInfo.description}</CardBody>
    //         </Bullseye>
    //         <CardFooter>
    //           <Button component="a" href={providerInfo.url} target="_blank" rel="noreferrer" variant="danger">{providerInfo.text}</Button>
    //         </CardFooter>
    //       </Card>
    // </Flex>
    <Flex direction={ {default: 'column'}} flex={{ default: 'flex_1' }} justifyContent={ {default: 'justifyContentSpaceBetween'}} alignSelf={ {default: "alignSelfStretch"}}>
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
      </FlexItem>
      <FlexItem>
        <Title headingLevel='h1'>{providerInfo.title}</Title>
      </FlexItem>
      <FlexItem>
        <p>{providerInfo.description}</p>
      </FlexItem>
      <FlexItem key={`provider_card_${providerInfo.name}`}>
        {/* img */}
        &nbsp;
      </FlexItem>
      <FlexItem>
        <Button component="a" href={providerInfo.url} target="_blank" rel="noreferrer" variant="link">{providerInfo.text}</Button>
       </FlexItem>
    </Flex>

  )
}

export { InternalLinksCard }

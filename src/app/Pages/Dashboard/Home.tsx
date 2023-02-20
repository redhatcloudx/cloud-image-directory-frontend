import * as React from 'react';
import {
  PageSectionVariants, PageSection, Title, Flex, FlexItem, Bullseye, TitleSizes, Text, TextVariants,
} from '@patternfly/react-core';
import ProviderCard from '@app/components/ProviderCard'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'

const providerInfos = [
  {
    name: 'aws',
    text: 'Launch now',
    url: 'https://aws.amazon.com/marketplace/pp/prodview-kv5mi3ksb2mma?sr=0-1&ref_=beagle&applicationId=AWSMPContessa'
  },
  {
    name: 'google',
    text: 'Launch now',
    url: 'https://console.cloud.google.com/marketplace/product/rhel-cloud/rhel-9?project=cockpituous'
  },
  {
    name: 'azure',
    text: 'Launch now',
    url: 'https://azuremarketplace.microsoft.com/en-us/marketplace/apps/redhat.rhel-20190605?tab=Overview'
  },
  {
    name: 'redhat',
    text: 'Build now',
    url: 'https://console.redhat.com/insights/image-builder'
  }
]

const Home: React.FunctionComponent<{title: string}> = ({title}) => {

  useDocumentTitle(title)
  return (
    <div>
    <PageSection variant={PageSectionVariants.darker}>
      <Bullseye>
      <Title headingLevel="h2" size={TitleSizes['3xl']}>Red Hat Enterprise Linux 9</Title>
      </Bullseye>
      <Bullseye>
      <Title headingLevel="h1" size={TitleSizes['4xl']}>Linux crafted for the Cloud</Title>
      </Bullseye>
    </PageSection>
    <PageSection variant={PageSectionVariants.darker}>
      <Bullseye>
        <Flex>
          {providerInfos.map(({name, text, url}, index) => (
            <FlexItem key={`provider_card_${index}`}>
              <ProviderCard name={name} text={text} url={url}/>
            </FlexItem>
          ))}
        </Flex>
      </Bullseye>
    </PageSection>
    <PageSection variant={PageSectionVariants.darker}></PageSection>
    <PageSection >
      <Bullseye>
        <Text component={TextVariants.small}>{`Copyright © Red Hat ${new Date().getFullYear()}.`}</Text>
      </Bullseye>
    </PageSection>
    </div>
  )
}

export { Home }

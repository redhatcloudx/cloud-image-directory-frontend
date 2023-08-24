import React from 'react';
import {
  Bullseye,
  Button,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Divider,
  Stack,
  StackItem,
  Flex,
  FlexItem,
} from '@patternfly/react-core';

import redhat_logo from '@app/bgimages/redhat_clear.png';
import aws_logo from '@app/bgimages/aws.png';
import azure_logo from '@app/bgimages/azure.png';
import google_logo from '@app/bgimages/google.png';
import { ArrowRightIcon } from '@patternfly/react-icons';

const loadImage = (name: Provider) => {
  switch (name) {
    case Provider.aws:
      return aws_logo;
    case Provider.azure:
      return azure_logo;
    case Provider.google:
      return google_logo;
  }
};

const displayText = (name: Provider) => {
  switch (name) {
    case Provider.aws:
      return 'Launch in AWS';
    case Provider.azure:
      return 'Launch in Azure';
    case Provider.google:
      return 'Launch in Google Cloud';
  }
};

const getURL = (name: Provider) => {
  switch (name) {
    case Provider.aws:
      return 'https://aws.amazon.com/marketplace/pp/prodview-kv5mi3ksb2mma?sr=0-1&ref_=beagle&applicationId=AWSMPContessa';
    case Provider.azure:
      return 'https://azuremarketplace.microsoft.com/en-us/marketplace/apps/redhat.rhel-20190605?tab=Overview';
    case Provider.google:
      return 'https://console.cloud.google.com/marketplace/product/rhel-cloud/rhel-9?project=cockpituous';
  }
};
enum Provider {
  'aws',
  'azure',
  'google',
}

type ProviderCardProps = {
  provider: Provider;
};

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Stack>
      <StackItem>
        <Bullseye>
          <img style={{ height: 100, width: 100 }} src={loadImage(provider)} alt="External provider" />
        </Bullseye>
      </StackItem>
      <StackItem>
        <Bullseye>
          <Button component="a" href={getURL(provider)} target="_blank" variant="link" isLarge>
            {displayText(provider)} <ArrowRightIcon />
          </Button>
        </Bullseye>
      </StackItem>
    </Stack>
  );
};

const ExternalLinksCard: React.FunctionComponent = () => {
  return (
    <Card isLarge isFlat>
      <CardTitle>
        <Stack>
          <StackItem>
            <img
              src={redhat_logo}
              style={{
                height: '2vw',
              }}
            />
          </StackItem>
          <StackItem>
            <p>Get the latest Red Hat Enterprise Linux certified image for cloud deployment</p>
          </StackItem>
        </Stack>
      </CardTitle>
      <CardBody>
        <p>Launch the latest RHEL certified cloud image through available cloud service provider marketplaces.</p>
        <br />
        <Flex justifyContent={{ default: 'justifyContentCenter' }}>
          <FlexItem>
            <ProviderCard provider={Provider.aws} />
          </FlexItem>
          <Divider orientation={{ default: 'vertical' }} />
          <FlexItem>
            <ProviderCard provider={Provider.google} />
          </FlexItem>
          <Divider orientation={{ default: 'vertical' }} />
          <FlexItem>
            <ProviderCard provider={Provider.azure} />
          </FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
};

export { ExternalLinksCard };

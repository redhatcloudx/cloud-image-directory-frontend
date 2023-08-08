import React from 'react';
import { Button, Card, CardBody, CardFooter, CardTitle, Stack, StackItem } from '@patternfly/react-core';

import redhat_logo from '@app/bgimages/redhat_clear.png';
import { ArrowRightIcon } from '@patternfly/react-icons';

const redhatProviderInfo = {
  title: 'Build your own RHEL cloud image',
  description:
    "With Red Hat's image builder, you can create customizable and repeatable operating system images and server images",
  text: 'Build an image ->',
  url: 'https://console.redhat.com/insights/image-builder',
};

const InternalLinksCard: React.FunctionComponent = () => {
  return (
    <Card isFlat isFullHeight isLarge>
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
            <p>{redhatProviderInfo.title}</p>
          </StackItem>
        </Stack>
      </CardTitle>
      <CardBody>{redhatProviderInfo.description}</CardBody>
      <CardFooter>
        <Button component="a" href={redhatProviderInfo.url} target="_blank" variant="link" isLarge>
          Build an image <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export { InternalLinksCard };

import React from 'react';
import { Button, Card, CardBody, CardFooter, CardTitle, Stack, StackItem } from '@patternfly/react-core';

import redhat_logo from '@app/bgimages/redhat_clear.png';
import { ArrowRightIcon } from '@patternfly/react-icons';

const providerInfo = {
  name: 'redhat',
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
            <p>Build your own RHEL cloud image</p>
          </StackItem>
        </Stack>
      </CardTitle>
      <CardBody>
        With Red Hat's Image Builder, you can create customizable and repeatable operating system images and server
        images.
      </CardBody>
      <CardFooter>
        <Button variant="link" isLarge>
          Build an image <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export { InternalLinksCard };

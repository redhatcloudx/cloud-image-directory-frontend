import React from 'react';
import {
  Button,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  TextContent,
  Tabs,
  Tab,
  TabTitleText,
  Title,
  Stack,
  StackItem
} from '@patternfly/react-core';
import {
  PlayIcon,
  CopyIcon,
  MastodonIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  ShareIcon
} from '@patternfly/react-icons';
import crypto from 'crypto'

export const DetailsView: React.FunctionComponent<{ details: object }> = ({ details }) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [copied, setCopied] = React.useState<boolean>(false);

  const shareOnMastodon = (version: string, provider: string, imageURL: string) => {
    const domain = prompt("Enter your Mastodon domain", "mastodon.social");
    if (domain == "" || domain == null) {
      return;
    }
    window.open(`https://${domain}/?text=Run%20RHEL%20${version}%20on%20${provider}&url=${imageURL}`, '_blank');
  }

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };



  const copyButton = (data: string) => {
    return (
      <React.Fragment>
        <ClipboardCopyButton
          id="basic-copy-button"
          textId="code-content"
          aria-label="Copy to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(data);
            setCopied(true)
          }}
          exitDelay={600}
          maxWidth="110px"
          variant="plain"
        >
          {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
        </ClipboardCopyButton>
      </React.Fragment>
    )
  }

  let cliCommand;
  let shellUrl;
  let displayItems = [
    {
      Title: 'Cloud Provider',
      Data: details['provider'],
    },
    {
      Title: 'RHEL Version',
      Data: details['version'],
    },
    {
      Title: 'Release Date',
      Data: new Date(details['date']).toDateString(),
    },
    {
      Title: 'Architecture',
      Data: details['arch'],
    },
  ];

  const hash = crypto.createHash('sha1')
  hash.update(details['name'].replace(/ /g, '_').toLowerCase());
  const shareURL = `https://imagedirectory.cloud/images/rhel/${details['provider']}/${details['version']}/${details['region']}/${hash.digest('hex')}`;

  // Conditionally configure the content of the image details view
  switch (details['provider']) {
    case 'aws':
      const instanceType: string = details['arch'] === 'x86_64' ? 't3.medium' : 't4g.medium';
      cliCommand = `aws ec2 run-instances \\
        --image-id ${details['imageId']} \\
        --count 1 \\
        --instance-type ${instanceType} \\
        --key-name <MyKeyPair> \\
        --security-group-ids <MySecurityGroupID>`;
      shellUrl = 'https://console.aws.amazon.com/cloudshell/home';
      displayItems.push(
        {
          Title: 'Region',
          Data: details['region'],
        },
        {
          Title: 'Image ID',
          Data: <span>{details['imageId']} {copyButton(details['imageId'])}</span>,
        }
      );
      break;

    case 'azure':
      const urnParts = details['imageId'].split(':');
      const offer = urnParts[1];
      const sku = urnParts[2];
      cliCommand = `az vm create -n <MachineName> -g <ResourceGroup> --image ${details['imageId']}`;
      shellUrl = 'https://portal.azure.com/';
      displayItems.push(
        {
          Title: 'Urn',
          Data: <span>{details['imageId']} {copyButton(details['imageId'])}</span>,
        },
        {
          Title: 'Offer',
          Data: offer,
        },
        {
          Title: 'Sku',
          Data: sku,
        }
      );
      break;

    case 'google':
      cliCommand = `gcloud beta compute instances create <MachineName> \\
        --machine-typei=e2-medium \\
        --subnet=default \\
        ---image="${details['imageId']}" \\
        ---boot-disk-device-name=<MachineName> \\
        ---project <ProjectName>`;
      shellUrl = 'https://shell.cloud.google.com/?show=terminal';
      displayItems.push({
        Title: 'Image ID',
        Data: <span>{details['imageId']} {copyButton(details['imageId'])}</span>,
      });
      break;

    default:
      break;
  }

  return (
    <React.Fragment>
      <Tabs
        isFilled
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox={true}
        aria-label="Cloud image details view"
        role="region"
      >
        <Tab eventKey={0} title={<TabTitleText>Image Details</TabTitleText>} aria-label="Show RHEL cloud image details">
          <Stack hasGutter>
            <StackItem>
              <Title headingLevel='h3'>
                {'Image Details'}
              </Title>
            </StackItem>
            <StackItem>
              <DescriptionList columnModifier={{
                sm: '1Col',
                lg: '2Col',
                xl: '2Col'
              }}>
                {displayItems.map((item, index) => {
                  return (
                    <DescriptionListGroup key={`description-list-group-${item.Title}-${index}`}>
                      <DescriptionListTerm key={`description-list-term-${item.Title}-${index}`}>{item.Title}</DescriptionListTerm>
                      <DescriptionListDescription>{item.Data}</DescriptionListDescription>
                    </DescriptionListGroup>
                  );
                })}
              </DescriptionList>
            </StackItem>

            <StackItem>
              {details['provider'] != 'azure' && (
                <Button component="a" href={details['selflink']} target="_blank" rel="noreferrer" style={{
                  color: 'pf-color-blue-400'
                }} isLarge>
                  Launch now
                </Button>
              )}
            </StackItem>

            <StackItem>
              <Title headingLevel='h3'>
                {'Share this image'}
              </Title>
              <Button variant="plain"
                onClick={() => {
                  navigator.clipboard.writeText(shareURL);
                }}>
                Copy URL
              </Button>
              <a onClick={() => { shareOnMastodon(details['version'], details['provider'], window.location.href) }}>
                <Button variant="link" isInline>
                  <MastodonIcon size="md" />
                </Button>
              </a>
              <a href={`https://twitter.com/intent/tweet?text=Run%20RHEL%20${details['version']}%20on%20${details['provider']}&url=${shareURL}`}
                target="_blank"
                rel="noreferrer">
                <Button variant="link" isInline>
                  <TwitterIcon size="md" />
                </Button>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`}
                target="_blank"
                rel="noreferrer">
                <Button variant="link" isInline>
                  <FacebookIcon size="md" />
                </Button>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`}
                target="_blank"
                rel="noreferrer">
                <Button variant="link" isInline>
                  <LinkedinIcon size="md" />
                </Button>
              </a>
            </StackItem>
          </Stack>
        </Tab>

        <Tab eventKey={1} title={<TabTitleText>Launch from CLI</TabTitleText>} aria-label={`Run RHEL cloud image on ${details['provider']}`}>
          <Stack hasGutter>
            <StackItem>
              <Title headingLevel='h3'>
                {'Example CLI Command'}
              </Title>
            </StackItem>
            <StackItem>
              <CodeBlock
                actions={
                  <>
                    <CodeBlockAction>
                      {copyButton(cliCommand)}
                    </CodeBlockAction>
                    <CodeBlockAction>
                      <Button
                        variant="plain"
                        aria-label="Play icon"
                        component="a"
                        href={shellUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <PlayIcon />
                      </Button>
                    </CodeBlockAction>
                  </>
                }
              >
                <CodeBlockCode id="code-content">
                  <TextContent>{cliCommand}</TextContent>
                </CodeBlockCode>
              </CodeBlock>
            </StackItem>
          </Stack>
        </Tab>
      </Tabs>
    </React.Fragment >
  );

}

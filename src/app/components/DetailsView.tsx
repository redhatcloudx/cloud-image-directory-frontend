import React from 'react';
import {
  Button,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  TextContent,
  TextList,
  TextListItem,
} from '@patternfly/react-core';
import { PlayIcon } from '@patternfly/react-icons';

interface IImageModalProps {
  details: object;
}

interface IImageModalState {
  copied: boolean;
}

export default class DetailsView extends React.Component<IImageModalProps, IImageModalState> {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
  }

  render() {
    const { copied } = this.state;

    const { details } = this.props;
    let googleSelflink;
    let cliCommand;
    let shellUrl;
    let displayItems = [
      {
        Title: 'Name',
        Data: details['name'],
      },
      {
        Title: 'Release Date',
        Data: details['date'],
      },
      {
        Title: 'Version',
        Data: details['version'],
      },
      {
        Title: 'Architecture',
        Data: details['arch'],
      },
    ];
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
            Title: 'Image ID',
            Data: details['imageId'],
          },
          {
            Title: 'Region',
            Data: details['region'],
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
            Data: details['imageId'],
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
        googleSelflink = "https://console.cloud.google.com/compute/imagesDetail/projects" + details['selflink'].split('projects')[1];
        cliCommand = `gcloud beta compute instances create <MachineName> \\
        --machine-typei=e2-medium \\
        --subnet=default \\
        --image="${details['selflink']}" \\
        --boot-disk-device-name=<MachineName> \\
        --project <ProjectName>`;
        shellUrl = 'https://shell.cloud.google.com/?show=terminal';
        displayItems.push({
          Title: 'Image ID',
          Data: details['imageId'],
        });
        break;

      default:
        break;
    }

    const buttonLink = details['provider'] == 'google' ? googleSelflink : details['selflink']

    return (
      <React.Fragment>
        <TextContent id="test1" className="pf-u-py-xl">
          <h1>Image Details</h1>
        </TextContent>
        <TextContent id="test2" className="pf-u-py-xl">
          <TextList component="dl">
            {displayItems.map((item, index) => {
              return (
                <div key={`menu-details-${item.Title}-${index}`}>
                  <TextListItem key={`menu-title-${item.Title}-${index}`} component="dt">
                    {item.Title}
                  </TextListItem>
                  <TextListItem key={`menu-data-${item.Title}-${index}`} component="dd">
                    {item.Data}
                  </TextListItem>
                </div>
              );
            })}
          </TextList>
          {details['provider'] != 'azure' && (
            <Button component="a" href={buttonLink} target="_blank" rel="noreferrer" variant="danger">
              Launch now
            </Button>
          )}
        </TextContent>

        <TextContent id="test1" className="pf-u-py-xl">
          <br></br>
        </TextContent>
        <TextContent id="test1" className="pf-u-py-xl">
          <h1>Optional: Launch from CLI</h1>
        </TextContent>
        <TextContent id="test1" className="pf-u-py-xl">
          <br></br>
        </TextContent>
        <CodeBlock
          actions={
            <>
              <CodeBlockAction>
                <ClipboardCopyButton
                  id="basic-copy-button"
                  textId="code-content"
                  aria-label="Copy to clipboard"
                  onClick={() => {
                    navigator.clipboard.writeText(cliCommand);
                  }}
                  exitDelay={600}
                  maxWidth="110px"
                  variant="plain"
                >
                  {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
                </ClipboardCopyButton>
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
      </React.Fragment>
    );
  }
}

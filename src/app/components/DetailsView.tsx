import React from 'react'
import { AboutModal, ActionGroup, Alert, Button, ClipboardCopyButton, CodeBlock, CodeBlockAction, CodeBlockCode, ExpandableSection, Form, FormGroup, FormSelect, FormSelectOption, Popover, TextArea, TextContent, TextInput, TextList, TextListItem } from '@patternfly/react-core'
import { PlayIcon } from '@patternfly/react-icons'

interface IImageModalProps {
  details: object
}

interface IImageModalState {
  projectName: string
  zoneName: string
  subnetID: string
  machineType: string
  machineName: string
  resourcegroupName: string
  copied: boolean
  isExpanded: boolean
}

export default class DetailsView extends React.Component<IImageModalProps, IImageModalState> {
  handleMachinTypeInputChange: (value: string) => void
  onConfigExpand: (isExpanded: boolean) => void
  handleSubnetIDInputChange: (value: string) => void
  handleResourcegroupNameInputChange: (value: string) => void
  handleMachinNameInputChange: (value: string) => void
  handleProjectNameInputChange: (value: string) => void
  handleZoneNameInputChange: (value: string) => void

  constructor(props) {
    super(props)

    this.state = {
      projectName: 'your-project',
      zoneName: 'us-central1-a',
      subnetID: 'us-central1-a',
      machineType: 'e2-medium',
      machineName: 'vm-1',
      resourcegroupName: 'resourcegroup-1',
      copied: false,
      isExpanded: false,
    }

    this.handleMachinNameInputChange = (value: string) => {
      this.setState({
        machineName: value
      })
    }

    this.handleMachinTypeInputChange = (value: string) => {
      this.setState({
        machineType: value
      })
    }

    this.handleSubnetIDInputChange = (value: string) => {
      this.setState({
        subnetID: value
      })
    }

    this.onConfigExpand = (isExpanded: boolean) => {
      this.setState({
        isExpanded
      })
    }

    this.handleResourcegroupNameInputChange = (value: string) => {
      this.setState({
        resourcegroupName: value
      })
    }

    this.handleProjectNameInputChange = (value: string) => {
      this.setState({
        projectName: value
      })
    }

    this.handleZoneNameInputChange = (value: string) => {
      this.setState({
        zoneName: value
      })
    }

  }

  render () {
    const {
      projectName,
      zoneName,
      machineName,
      resourcegroupName,
      machineType,
      subnetID,
      copied,
      isExpanded
    } = this.state

    const {
      details
    } = this.props

    console.log(details)

    let cliCommand
    let shellUrl
    let displayItems = [
      {
        Title: 'Name',
        Data: details['name']
      },
      {
        Title: 'Release Date',
        Data: details['date']
      },
      {
        Title: 'Version',
        Data: details['version']
      },
      {
        Title: 'Architecture',
        Data: details['arch']
      }
    ]
    // Conditionally configure the content of the image details view
    switch (details['provider']) {
      case 'aws':
        cliCommand = `aws ec2 run-instances \\
        --image-id ${details['imageId']} \\
        --count 1 \\
        --instance-type ${details['machineType']} \\
        --key-name <MyKeyPair> \\
        --security-group-ids <MySecurityGroupID> \\
        --subnet-id ${details['subnetID']}`
        shellUrl = 'https://console.aws.amazon.com/cloudshell/home'
        displayItems.push(
          {
            Title: 'Image ID',
            Data: details['imageId']
          },
          {
            Title: 'Region',
            Data: details['region']
          }
        )
        break

      case 'azure':
        const urnParts = details['imageId'].split(':')
        const offer = urnParts[1]
        const sku = urnParts[2]
        cliCommand = `az vm create -n ${machineName} -g ${resourcegroupName} --image ${details['imageId']}`
        shellUrl = 'https://portal.azure.com/'
        displayItems.push(
          {
            Title: 'Urn',
            Data: details['imageId']
          },
          {
            Title: 'Offer',
            Data: offer
          },
          {
            Title: 'Sku',
            Data: sku
          }

        )
        break

      case 'google':
        const image_path = details['selflink'].split('projects')[1]
        cliCommand = `gcloud beta compute instances create ${machineName} \\
        --zone=${zoneName} \\
        --machine-type=${machineType} \\
        --subnet=default \\
        --image="https://www.googleapis.com/compute/v1/projects${image_path}" \\
        --boot-disk-device-name=${machineName} \\
        --project ${projectName}`
        shellUrl = 'https://shell.cloud.google.com/?show=terminal'
        displayItems.push(
          {
            Title: 'Image ID',
            Data: details['imageId']
          }
        )
        break

      default:
        break
    }



    return (
      <React.Fragment>
          <TextContent id="test1" className="pf-u-py-xl">
            <h1>Image Details</h1>
          </TextContent>
          <TextContent id="test2" className="pf-u-py-xl">
            <TextList component="dl">
              {displayItems.map((item, _index) => {
                return(
                  <div>
                    <TextListItem component="dt">{item.Title}</TextListItem>
                    <TextListItem component="dd">{item.Data}</TextListItem>
                  </div>
                )
              })}
            </TextList>
            { details['provider'] != 'azure' &&
              <Button component="a" href={details['selflink']} target="_blank" rel="noreferrer"  variant="danger">
                Launch now
              </Button>
            }
          </TextContent>

          <TextContent id="test1" className="pf-u-py-xl">
            <br></br>
          </TextContent>
          <TextContent id="test1" className="pf-u-py-xl">
            <h1>Optional: Launch from CLI</h1>
          </TextContent>
          <ExpandableSection toggleText={'Configure the command'}
            onToggle={this.onConfigExpand}
            isExpanded={isExpanded}
          >
            {
              details['provider'] == 'aws' && (
                <Form isWidthLimited>
                  <FormGroup
                    label="Machine Type"
                    isRequired
                    fieldId="project-name-field"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-name-02"
                      name="simple-form-name-02"
                      aria-describedby="simple-form-name-02-helper"
                      value={machineType}
                      onChange={this.handleMachinTypeInputChange}
                    />
                  </FormGroup>
                  <FormGroup label="Subnet ID"
                    isRequired
                    fieldId="simple-form-email-02"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-email-02"
                      name="simple-form-email-02"
                      value={subnetID}
                      onChange={this.handleSubnetIDInputChange}
                    />
                  </FormGroup>
                </Form>
              )
            }
            {
              details['provider'] == 'azure' && (
                <Form isWidthLimited>
                  <FormGroup
                    label="VM Name"
                    isRequired
                    fieldId="vm-name-field"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-name-02"
                      name="simple-form-name-02"
                      aria-describedby="simple-form-name-02-helper"
                      value={machineName}
                      onChange={this.handleMachinNameInputChange}
                    />
                  </FormGroup>
                  <FormGroup label="Resource Group Name"
                    isRequired
                    fieldId="simple-form-email-02"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-email-02"
                      name="simple-form-email-02"
                      value={resourcegroupName}
                      onChange={this.handleResourcegroupNameInputChange}
                    />
                  </FormGroup>
                </Form>
              )
            }
            {
              details['provider'] == 'google' && (
                <Form isWidthLimited>
                  <FormGroup
                    label="Project Name"
                    isRequired
                    fieldId="project-name-field"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-name-02"
                      name="simple-form-name-02"
                      aria-describedby="simple-form-name-02-helper"
                      value={projectName}
                      onChange={this.handleProjectNameInputChange}
                    />
                  </FormGroup>
                  <FormGroup label="Instance Name"
                    isRequired
                    fieldId="simple-form-email-02"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-email-02"
                      name="simple-form-email-02"
                      value={machineName}
                      onChange={this.handleMachinNameInputChange}
                    />
                  </FormGroup>
                  <FormGroup label="Zone"
                    isRequired
                    fieldId="simple-form-email-02"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-email-02"
                      name="simple-form-email-02"
                      value={zoneName}
                      onChange={this.handleZoneNameInputChange}
                    />
                  </FormGroup>
                  <FormGroup label="Machine Type"
                    isRequired
                    fieldId="simple-form-email-02"
                  >
                    <TextInput
                      isRequired
                      type="text"
                      id="simple-form-email-02"
                      name="simple-form-email-02"
                      value={machineType}
                      onChange={this.handleMachinTypeInputChange}
                    />
                  </FormGroup>
                </Form>
              )
            }
          </ExpandableSection>
          <TextContent id="test1" className="pf-u-py-xl">
            <br></br>
          </TextContent>
          <CodeBlock actions={
            <>
            <CodeBlockAction>
              <ClipboardCopyButton
                id="basic-copy-button"
                textId="code-content"
                aria-label="Copy to clipboard"
                onClick={() => {navigator.clipboard.writeText(cliCommand)}}
                exitDelay={600}
                maxWidth="110px"
                variant="plain">
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
                rel="noreferrer">
                <PlayIcon  />
              </Button>
            </CodeBlockAction>
            </>
          }>
            <CodeBlockCode id="code-content"><TextContent>{cliCommand}</TextContent></CodeBlockCode>
          </CodeBlock>
      </React.Fragment>
    )
  }
}

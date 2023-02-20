import React from 'react'
import { AboutModal, ActionGroup, Alert, Button, ClipboardCopyButton, CodeBlock, CodeBlockAction, CodeBlockCode, ExpandableSection, Form, FormGroup, FormSelect, FormSelectOption, Popover, TextArea, TextContent, TextInput, TextList, TextListItem } from '@patternfly/react-core'
import bgImg from '@app/bgimages/bg.png'
import brandImg from '@app/bgimages/redhat_clear.png'
import { PlayIcon } from '@patternfly/react-icons'

interface IAWSImageModalProps {
  imageID: string
  majorRelease: string
  architecture: string
  name: string
  region: string
  date: string
  url: string
}

interface IAWSImageModalState {
  isModalOpen: boolean
  subnetID: string
  machineType: string
  copied: boolean
  isExpanded: boolean
}

export default class AWSImageModal extends React.Component<IAWSImageModalProps, IAWSImageModalState> {
  toggleModal: () => void
  handleMachinTypeInputChange: (value: string) => void
  onConfigExpand: (isExpanded: boolean) => void
  handleSubnetIDInputChange: (value: string) => void

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      subnetID: 'us-central1-a',
      machineType: 'e2-medium',
      copied: false,
      isExpanded: false,
    }

    this.toggleModal = () => {
      const { isModalOpen } = this.state
      this.setState({
        isModalOpen: !isModalOpen
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
  }

  render () {
    const {
      isModalOpen,
      machineType,
      subnetID,
      copied,
      isExpanded
    } = this.state

    const {
      imageID,
      majorRelease,
      architecture,
      name,
      region,
      date,
      url,
    } = this.props

    const cliCommand = `aws ec2 run-instances \\
    --image-id ${imageID} \\
    --count 1 \\
    --instance-type ${machineType} \\
    --key-name <MyKeyPair> \\
    --security-group-ids <MySecurityGroupID> \\
    --subnet-id ${subnetID}`

    const shellUrl = 'https://console.aws.amazon.com/cloudshell/home'

    return (
      <React.Fragment>
        <Button variant="danger" onClick={this.toggleModal}>
          Launch
        </Button>
        <AboutModal
          isOpen={isModalOpen}
          onClose={this.toggleModal}
          trademark={`Copyright © Red Hat ${new Date().getFullYear()}.`}
          brandImageSrc={brandImg}
          brandImageAlt="Red Hat"
          noAboutModalBoxContentContainer={true}
          productName={`Red Hat Enterprise Linux ${majorRelease}`}
          backgroundImageSrc={bgImg}
        >
          <TextContent id="test1" className="pf-u-py-xl">
            <h1>Image Details</h1>
          </TextContent>
          <TextContent id="test2" className="pf-u-py-xl">
            <TextList component="dl">
              <TextListItem component="dt">Name</TextListItem>
              <TextListItem component="dd">{name}</TextListItem>
              <TextListItem component="dt">Major Version</TextListItem>
              <TextListItem component="dd">{majorRelease}</TextListItem>
              <TextListItem component="dt">Architecture</TextListItem>
              <TextListItem component="dd">{architecture}</TextListItem>
              <TextListItem component="dt">Image ID</TextListItem>
              <TextListItem component="dd">{imageID}</TextListItem>
              <TextListItem component="dt">Region</TextListItem>
              <TextListItem component="dd">{region}</TextListItem>
              <TextListItem component="dt">Release Date</TextListItem>
              <TextListItem component="dd">{date}</TextListItem>
            </TextList>
            <Button component="a" href={url} target="_blank" rel="noreferrer"  variant="danger">
              Launch now
            </Button>
          </TextContent>

          <TextContent id="test1" className="pf-u-py-xl">
            <br></br>
          </TextContent>
          <TextContent id="test1" className="pf-u-py-xl">
            <h1>Optional: Launch from CLI</h1>
          </TextContent>
          <ExpandableSection toggleText={isExpanded ? 'Configure the command' : 'Configure the command'} onToggle={this.onConfigExpand} isExpanded={isExpanded}>
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
        </AboutModal>
      </React.Fragment>
    )
  }
}

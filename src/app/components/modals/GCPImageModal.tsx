import React from 'react'
import { AboutModal, ActionGroup, Alert, Button, ClipboardCopyButton, CodeBlock, CodeBlockAction, CodeBlockCode, ExpandableSection, Form, FormGroup, FormSelect, FormSelectOption, Popover, TextArea, TextContent, TextInput, TextList, TextListItem } from '@patternfly/react-core'
import bgImg from '@app/bgimages/bg.png'
import brandImg from '@app/bgimages/redhat_clear.png'
import { PlayIcon } from '@patternfly/react-icons'

interface IGCPImageModalProps {
  imageID: string
  majorRelease: string
  architecture: string
  date: string
  url: string
}

interface IGCPImageModalState {
  isModalOpen: boolean
  instanceName: string
  projectName: string
  zoneName: string
  machineType: string
  copied: boolean
  isExpanded: boolean
}

export default class GCPImageModal extends React.Component<IGCPImageModalProps, IGCPImageModalState> {
  toggleModal: () => void
  handleInstanceNameInputChange: (value: string) => void
  handleProjectNameInputChange: (value: string) => void
  handleZoneNameInputChange: (value: string) => void
  handleMachinTypeInputChange: (value: string) => void
  onConfigExpand: (isExpanded: boolean) => void

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      instanceName: 'instance-1',
      projectName: 'your-project',
      zoneName: 'us-central1-a',
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

    this.handleInstanceNameInputChange = (value: string) => {
      this.setState({
        instanceName: value
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

    this.handleMachinTypeInputChange = (value: string) => {
      this.setState({
        machineType: value
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
      instanceName,
      projectName,
      zoneName,
      machineType,
      copied,
      isExpanded
    } = this.state

    const {
      imageID,
      majorRelease,
      architecture,
      date,
      url
    } = this.props

    const image_path = url.split('projects')[1]
    const cliCommand = `gcloud beta compute instances create ${instanceName} \\
    --zone=${zoneName} \\
    --machine-type=${machineType} \\
    --subnet=default \\
    --image="https://www.googleapis.com/compute/v1/projects${image_path}" \\
    --boot-disk-device-name=${instanceName} \\
    --project ${projectName}`

    const shellUrl = 'https://shell.cloud.google.com/?show=terminal'


    return (
      <React.Fragment>
        <Button variant="danger" onClick={this.toggleModal}>
          Launch
        </Button>
        <AboutModal
          isOpen={isModalOpen}
          onClose={this.toggleModal}
          trademark={`Cloud Experience ${new Date().getFullYear()}.`}
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
              <TextListItem component="dt">Image ID</TextListItem>
              <TextListItem component="dd">{imageID}</TextListItem>
              <TextListItem component="dt">Major Version</TextListItem>
              <TextListItem component="dd">{majorRelease}</TextListItem>
              <TextListItem component="dt">Architecture</TextListItem>
              <TextListItem component="dd">{architecture}</TextListItem>
              <TextListItem component="dt">Release Date</TextListItem>
              <TextListItem component="dd">{date}</TextListItem>
            </TextList>
            <Button
            variant="danger"
            component="a"
            href={url}
            target="_blank"
            rel="noreferrer">
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
                value={instanceName}
                onChange={this.handleInstanceNameInputChange}
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

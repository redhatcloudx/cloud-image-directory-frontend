import React from 'react'
import { AboutModal, ActionGroup, Alert, Button, ClipboardCopyButton, CodeBlock, CodeBlockAction, CodeBlockCode, ExpandableSection, Form, FormGroup, FormSelect, FormSelectOption, Popover, TextArea, TextContent, TextInput, TextList, TextListItem } from '@patternfly/react-core'
import bgImg from '@app/bgimages/bg.png'
import brandImg from '@app/bgimages/redhat_clear.png'
import { PlayIcon } from '@patternfly/react-icons'

interface IAzureImageModalProps {
  architecture: string
  urn: string
  version: string
}

interface IAzureImageModalState {
  isModalOpen: boolean
  vmName: string,
  resourcegroupName: string
  copied: boolean
  isExpanded: boolean
}

export default class AzureImageModal extends React.Component<IAzureImageModalProps, IAzureImageModalState> {
  toggleModal: () => void
  onConfigExpand: (isExpanded: boolean) => void
  handleResourcegroupNameInputChange: (value: string) => void
  handleVMInputChange: (value: string) => void

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      vmName: 'vm-1',
      resourcegroupName: 'resourcegroup-1',
      copied: false,
      isExpanded: false,
    }

    this.toggleModal = () => {
      const { isModalOpen } = this.state
      this.setState({
        isModalOpen: !isModalOpen
      })
    }

    this.handleVMInputChange = (value: string) => {
      this.setState({
        vmName: value
      })
    }

    this.handleResourcegroupNameInputChange = (value: string) => {
      this.setState({
        resourcegroupName: value
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
      vmName,
      resourcegroupName,
      copied,
      isExpanded
    } = this.state

    const {
      architecture,
      urn,
      version
    } = this.props

    const majorRelease = version.split('.')[0]
    const urnParts = urn.split(':')
    const offer = urnParts[1]
    const sku = urnParts[2]
    const cliCommand = `az vm create -n ${vmName} -g ${resourcegroupName} --image ${urn}`
    const shellUrl = 'https://portal.azure.com/'

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
              <TextListItem component="dt">Urn</TextListItem>
              <TextListItem component="dd">{urn}</TextListItem>
              <TextListItem component="dt">Major Version</TextListItem>
              <TextListItem component="dd">{majorRelease}</TextListItem>
              <TextListItem component="dt">Architecture</TextListItem>
              <TextListItem component="dd">{architecture}</TextListItem>
              <TextListItem component="dt">Offer</TextListItem>
              <TextListItem component="dd">{offer}</TextListItem>
              <TextListItem component="dt">Sku</TextListItem>
              <TextListItem component="dd">{sku}</TextListItem>
              <TextListItem component="dt">Version</TextListItem>
              <TextListItem component="dd">{version}</TextListItem>
            </TextList>
            <br>
            </br>
          </TextContent>

          <TextContent id="test1" className="pf-u-py-xl">
            <h1>Configure your instance</h1>
          </TextContent>
          <ExpandableSection toggleText={isExpanded ? "Show less" : 'Show more'} onToggle={this.onConfigExpand} isExpanded={isExpanded}>
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
                value={vmName}
                onChange={this.handleVMInputChange}
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
          </ExpandableSection>
          <TextContent id="test1" className="pf-u-py-xl">
            <br></br>
          </TextContent>
          <TextContent id="test1" className="pf-u-py-xl">
            <h1>Launch your instance</h1>
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

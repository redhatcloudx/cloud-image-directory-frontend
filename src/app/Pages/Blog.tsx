import * as React from 'react'
import {
   PageSection, Bullseye, Text, TextContent, TextVariants,
  Card, CardTitle, CardBody, CardFooter
} from '@patternfly/react-core'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'
import post12png from '@app/bgimages/post1-2.png'

const Blog: React.FunctionComponent<{title: string}> = ({title}) => {

  useDocumentTitle(title)
  return (
    <div>
      <PageSection isFilled={true}>
      <Bullseye>
        <Card
          style={{
            width: 800,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <CardTitle>
            <p>Welcome to the Cloud Image Directory!</p>
            <Text component={TextVariants.small}>Author: Red Hat</Text>
          </CardTitle>
          <CardBody isFilled={false}>
            <Bullseye>
              <img src={post12png}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}></img>
            </Bullseye>
            <TextContent>
              <Text component={TextVariants.p}>
                Red Hat is excited to announce the availability of the first version of our Cloud Image Directory.
                Though this tool is in an experimental stage, we are releasing this early access version to our community so we stay
                true to our Open Source culture and engineering principles. We invite you to join us in this journey.
              </Text>

              <Text component={TextVariants.p}>
                Based on community feedback, we realize that many users struggle to find out when and where new images are available
                because they are neither actively promoted on cloud marketplaces, nor easily accessible on other available platforms.
                Research also suggests that experienced users benefit from searching for particular versions of cloud images,
                like specific older versions. You can use this tool to try your preferred images before considering other requirements,
                such as specific subscriptions and licenses.
              </Text>

              <Text component={TextVariants.h3}>
                What this tool is about
              </Text>

              <Text component={TextVariants.p}>
                Our new tool provides easy access to all Linux cloud images in the Red Hat ecosystem. Our vision is to help users find any publicly available
                cloud image so they can deploy it to their preferred environment.
                It provides a one-step dashboard that points to the latest cloud image release on the marketplace of your choice.
                If you are looking for a single-click spin-up for the newest version of your favorite distribution, you're set.
                If you are looking for a cloud image that comes with a specific version or feature,
                use the provider-specific browser to search, find, and select the image from a variety of offers.
              </Text>

              <Text component={TextVariants.h3}>
                How to use it
              </Text>

              <Text component={TextVariants.p}>
                You can access the Cloud Image Directory by navigating to <a className='text-link' href="https://imagedirectory.cloud/">https://imagedirectory.cloud/</a>.
                On the landing page, you can select any of the available cloud providers, which redirects you to the latest RHEL
                Image version available in the respective marketplace.
                You can also use our Red Hat image builder to customize your image by selecting <a className='text-link' href="https://console.redhat.com/insights/image-builder">“Build now”</a>.
                What makes the Cloud Image Directory unique is the new search engine available at the top header, where you can find your desired cloud image.
                For our initial release, we give you the entire lineup of available cloud images, ready for consumption.
                Each following iteration will bring more features for sorting, filtering, and searching to make it easier to find the image you need.
                When you find what you are looking for, you can expand the view to get all the information necessary to run the image in the cloud.
              </Text>

              <Text component={TextVariants.h3}>
                Feedback
              </Text>

              <Text component={TextVariants.p}>
                What do you think about this tool? What would you like to see as a new feature? Just drop a message to <a className='text-link' href="mailto:contact@imagedirectory.cloud">contact@imagedirectory.cloud</a>.
                We would love to hear your feedback!
              </Text>

              <Text component={TextVariants.h3}>
                Disclaimer
              </Text>

              <Text component={TextVariants.p}>
                This is an experiment and not an official Red Hat product.
              </Text>
            </TextContent>
          </CardBody>
          <CardFooter>31.03.2023</CardFooter>
        </Card>
        </Bullseye>
      </PageSection>
      <Footer />
    </div>
  )
}

export { Blog }

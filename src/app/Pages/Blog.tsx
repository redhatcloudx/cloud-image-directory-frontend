import * as React from 'react'
import {
   PageSection, Bullseye, Text, TextContent, TextVariants,
  Card, CardTitle, CardBody, CardFooter
} from '@patternfly/react-core'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'
import post11png from '@app/bgimages/post1-1.png'

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
            <p>The new Cloud Image Directory is now available</p>
            <Text component={TextVariants.small}>Author: The Cloud Experience Team</Text>
          </CardTitle>
          <CardBody isFilled={false}>
            <Bullseye>
              <img src={post11png}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}></img>
            </Bullseye>
            <TextContent>
              <Text component={TextVariants.p}>
                Our Cloud Experience team is excited to announce the availability of the first version of our Cloud Image Directory.
                This tool is in an experimental stage, however we have decided to release this early access version to our community
                and stay true to our open culture and engineering principles and invite you to join us in this journey.
              </Text>

              <Text component={TextVariants.p}>
                Based on community feedback, we realized that many users today struggle to find out when and where new images are available,
                because they are neither actively promoted on cloud marketplaces, nor easily accessible on other available platforms.
                In addition, research suggests that experienced users will benefit from searching for particular versions of cloud images,
                like specific older versions. Finally, you can use this tool to try out your preferred images before considering other requirements,
                such as specific subscriptions and licenses.
              </Text>

              <Text component={TextVariants.h3}>
                What this new tool is about
              </Text>

              <Text component={TextVariants.p}>
                Our  new tool provides easy access to all Linux cloud images.  Our vision is to help users search and quickly find any publicly
                available cloud image so they can conveniently deploy it to their preferred environment.
                It provides an easy one-step dashboard that points you to the latest cloud image release on the marketplace of your choice.
                If a single-click spin-up for the newest version of your favorite distribution is what you are looking for, you’re already set.
                If you are looking for a cloud image that comes with a specific version or feature, use the provider-specific browser to search,
                find, and select from a variety of offers.
              </Text>

              <Text component={TextVariants.h3}>
                How to use it
              </Text>

              <Text component={TextVariants.p}>
                You can access the Cloud Image Directory by navigating to https://imagedirectory.cloud/. On the landing page, you can select any of
                the available cloud providers, which redirects you to the latest RHEL Image version available in the respective marketplace.
                In addition, you can use our Red Hat image builder to customize your own image by selecting “Build now”.
                What makes the Cloud Image Directory unique is the new search engine available at the top header, where you can find your desired
                cloud image. For our initial release we have decided to give you the entire lineup of available cloud images, ready for consumption.
                Each following iteration will bring more features for sorting, filtering and searching, to make finding the image you need easier
                than ever before. Once you have found what you are looking for, you can expand the view to get all the information necessary to run
                the image in the cloud.
              </Text>

              <Text component={TextVariants.h3}>
                Feedback
              </Text>

              <Text component={TextVariants.p}>
                What do you think about this tool? What would you like to see as a new feature? Just drop a message to contact@imagedirectory.cloud.
                We would love to hear your feedback!
              </Text>

              <Text component={TextVariants.h3}>
                Disclaimer
              </Text>

              <Text component={TextVariants.p}>
                This is an experimental project run by the Red Hat Cloud Experience team and it is not an official Red Hat product.
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

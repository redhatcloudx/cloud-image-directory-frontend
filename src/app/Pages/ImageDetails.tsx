import * as React from 'react'
import {
   PageSection, Bullseye, Text, TextContent, TextVariants,
  Card, CardTitle, CardBody, CardFooter
} from '@patternfly/react-core'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'
import DetailsView from '@app/components/DetailsView'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ImageDetails: React.FunctionComponent<{title: string}> = ({title}) => {
  const [details, setDetails] = useState({})
  const { provider, region, imageName } = useParams()
  useDocumentTitle(title)

  useEffect(() => {
    fetch(`https://imagedirectory.cloud/images/v1/${provider}/${region}/${imageName}`, {
      method: 'get',
    })
    .then(res => res.json())
    .then(details => setDetails(details))
  }, [provider, region, imageName])

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
          <CardBody isFilled={false}>
            {details['imageId'] ? <DetailsView details={{...details, provider: provider}} /> : <div>Loading....</div>}
          </CardBody>
        </Card>
        </Bullseye>
      </PageSection>
      <Footer />
    </div>
  )
}

export { ImageDetails }

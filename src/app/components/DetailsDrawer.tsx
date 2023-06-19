import React from 'react';
import {
  DrawerPanelContent,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Title,
  Flex,
  FlexItem,
  Stack,
  StackItem
} from '@patternfly/react-core';
import { MouseEventHandler } from 'react';
import { DetailsView } from './DetailsView';

export const DetailsDrawer: React.FunctionComponent<{
  onCloseClick: MouseEventHandler,
  isExpanded: Boolean,
  drawerRef: any,
  details: object,
}> = ({ onCloseClick, isExpanded, drawerRef, details }) => {
  return (
    <React.Fragment>
      <DrawerPanelContent minSize='33%'>
        <DrawerHead>
          <Stack hasGutter>
            <StackItem>
              <Flex alignItems={{
                default: 'alignItemsCenter'
              }}>
                <FlexItem>
                  <Title headingLevel='h1'>
                    {details['name']}
                  </Title>
                </FlexItem>
                <FlexItem align={{ default: 'alignRight' }}>
                  <DrawerCloseButton onClick={onCloseClick} />
                </FlexItem>
              </Flex>
            </StackItem>
            <StackItem tabIndex={isExpanded ? 0 : -1} ref={drawerRef}>
              <DetailsView details={details} />
            </StackItem>
          </Stack>
        </DrawerHead>
      </DrawerPanelContent>
    </React.Fragment>
  );
};

import React from 'react';
import {
  DrawerPanelContent,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
} from '@patternfly/react-core';
import { MouseEventHandler } from 'react';
import DetailsView from './DetailsView';

export const DetailsDrawer: React.FunctionComponent<{
  onCloseClick: MouseEventHandler,
  isExpanded: Boolean,
  drawerRef: any,
  details: object,
}> = ({ onCloseClick, isExpanded, drawerRef, details }) => {
  return (
    <React.Fragment>
      <DrawerPanelContent>
        <DrawerHead>
          <span tabIndex={isExpanded ? 0 : -1} ref={drawerRef}>
            <DetailsView details={details} />
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={onCloseClick} />
          </DrawerActions>
        </DrawerHead>
      </DrawerPanelContent>
    </React.Fragment>
  );
};


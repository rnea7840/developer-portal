import React from 'react';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useModalController } from '../../hooks';
import { VeteranResourcesContent } from './VeteranResourcesContent';
import './VeteranResources.scss';

export const VeteranResources = (): JSX.Element => {
  const { modalVisible, setModalVisible } = useModalController();

  const handleModalClose = (): void => setModalVisible(false);

  return (
    <>
      <a
        className="vads-c-action-link--green"
        href="#Veteran"
        onClick={(): void => setModalVisible(true)}
        role="button"
      >
        Veterans, find helpful resources and contact info.
      </a>
      <VaModal
        aria-describedby="veteran-resources-description"
        aria-labelledby="veteran-resources-header"
        clickToClose
        onCloseEvent={handleModalClose}
        role="dialog"
        primaryButtonText="Close"
        onPrimaryButtonClick={handleModalClose}
        modalTitle="Veteran resources"
        large
        visible={modalVisible}
      >
        <VeteranResourcesContent />
      </VaModal>
    </>
  );
};

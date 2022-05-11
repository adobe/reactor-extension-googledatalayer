/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React from 'react';

import ExtensionView from '../components/extensionView';
import WrappedTextField from '../components/wrappedTextField';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => {
        const { settings } = initInfo;
        const { dataLayer } = settings || {};

        return {
          dataLayer: dataLayer || 'dataLayer'
        };
      }}
      getSettings={({ values: { dataLayer } }) => ({
        dataLayer
      })}
      validate={({ dataLayer }) => {
        const errors = {};

        if (!dataLayer) {
          errors.dataLayer = 'Please provide a data layer variable name';
        }

        return errors;
      }}
      render={() => (
        <WrappedTextField
          minWidth="size-6000"
          name="dataLayer"
          label="Google Data Layer object name"
          isRequired
          necessityIndicator="label"
          description="Your Google Data Layer name, for example dataLayer."
        />
      )}
    />
  );
};

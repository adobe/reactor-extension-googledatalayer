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

import { Flex, Heading, View } from '@adobe/react-spectrum';
import ExtensionView from '../components/extensionView';
import WrappedTextField from '../components/wrappedTextField';
import constants from '../../lib/helpers/constants';
import ToggleSwitch from '../components/toggleSwitch';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => {
        const { settings } = initInfo;
        const { dataLayer } = settings || {};
        const { doConvertArrayEvents } = settings || {};

        return {
          dataLayer: dataLayer || constants.DEFAULTDATALAYER,
          doConvertArrayEvents: doConvertArrayEvents || false
        };
      }}
      getSettings={({ values: { dataLayer, doConvertArrayEvents } }) => ({
        dataLayer,
        doConvertArrayEvents
      })}
      validate={({ dataLayer }) => {
        const errors = {};

        if (!dataLayer) {
          errors.dataLayer = 'Please provide a data layer variable name';
        }

        return errors;
      }}
      render={() => (
        <Flex direction="column" gap="size-100">
          <View>
            <WrappedTextField
              minWidth="size-6000"
              name="dataLayer"
              label="Google Data Layer name"
              isRequired
              necessityIndicator="label"
              description="e.g. dataLayer. Do not include 'window' - this is implicit"
            />
          </View>
          <View>
            <ToggleSwitch
              name="doConvertArrayEvents"
              label="support gtag events"
              marginTop="size-300"
            />
            <Heading level={2}>Support for gtag Event Arrays</Heading>
            <p>
              &quot;Lab&quot; feature, new in version 1.2.1. Please test
              thoroughly. Feedback is welcome ( google-data-layer@adobe.com )
            </p>
            <p>
              an event created with the wrapper gtag() function will result in
              the push of an event array to the data layer, as shown below. By
              default this would not be caught as an event by the Adobe Google
              Data Layer extension logic, and it is difficult to access the
              properties, as there is no key-value structure at the root level.
            </p>
            <p>
              [ <br />
              0: &quot;event&quot; <br />
              1: &quot;<em>event_name</em>&quot; <br />
              2: &#123; &quot;foo&quot;:&quot;bar&quot; &#125; <br />]
            </p>
            <p>
              Enabling the support for this will make this data available in the
              standard object key-value structure as shown below. <br />
              Note that this is done on-the-fly in Tags and is&nbsp;
              <strong>not</strong> pushed to the data layer, nor visible to
              Google systems.
            </p>
            <p>
              &#123;
              <br /> &quot;event&quot;: &quot;<em>event_name</em>&quot;,
              <br />
              &quot;foo&quot;:&quot;bar&quot;
              <br />
              &#125;
            </p>
            <p>
              If there is no need to support these array-type events in your
              implementation, it is recommended to leave this feature disabled.
            </p>
          </View>
        </Flex>
      )}
    />
  );
};

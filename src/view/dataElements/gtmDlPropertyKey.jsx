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
import { Heading } from '@adobe/react-spectrum';
import ExtensionView from '../components/extensionView';
import WrappedTextField from '../components/wrappedTextField';
import ToggleSwitch from '../components/toggleSwitch';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => {
        const { settings } = initInfo;
        const { value, isReturnOnlyEventProps } = settings || {};

        return {
          value,
          isReturnOnlyEventProps
        };
      }}
      getSettings={({ values: { value, isReturnOnlyEventProps } }) => ({
        value,
        isReturnOnlyEventProps
      })}
      validate={() => ({})}
      render={(isReturnOnlyEventProps) => (
        <>
          <WrappedTextField
            minWidth="size-6000"
            name="value"
            label="Google Data Layer property"
            necessityIndicator="label"
          />
          <ToggleSwitch
            isSelected={isReturnOnlyEventProps}
            label="Only event properties"
            name="isReturnOnlyEventProps"
            marginTop="size-300"
          />

          <Heading level={2}>If called within a data layer push event:</Heading>

          <ul>
            <li>
              An empty field returns a copy of the data layer computed state, or
              the event JSON object at the time of the event, depending on the
              <em>Only event properties</em> toggle setting.
            </li>
            <li>
              Entering a property returns the property from the data layer event
              or computed state, depending on the
              <em>Only event properties</em> toggle setting.
            </li>
            <li>
              Selecting the option <em>Only event properties</em> prevents the
              prevents the return of data layer computed state values. If this
              option is <strong>not set</strong>, the requested data attribute
              or empty field will will take values from the entire computed
              state.
            </li>
          </ul>

          <Heading level={2}>
            If called outside a data layer push event (for example in a core
            event such as Library Loaded):
          </Heading>

          <ul>
            <li>
              A data layer model property at the time of script execution is
              returned.
            </li>
            <li>
              An empty field returns a copy of the data layer computed state
              JSON as at at the time of script execution
            </li>
            <li>
              The <em>Only event properties</em> toggle does not have any effect
              in either of these cases.
            </li>
          </ul>
        </>
      )}
    />
  );
};

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

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => {
        const { settings } = initInfo;
        const { value } = settings || {};

        return {
          value
        };
      }}
      getSettings={({ values: { value } }) => ({
        value
      })}
      validate={() => ({})}
      render={() => (
        <>
          <WrappedTextField
            minWidth="size-6000"
            name="value"
            label="Google Data Layer property"
            necessityIndicator="label"
          />

          <Heading level={2}>
            If called with context (during an event, condition or action):
          </Heading>

          <ul>
            <li>
              empty field returns a copy of the datalayer model JSON object at
              the time of the event
            </li>
            <li>
              entering a property returns the property of the datalayer model,
              eg. &apos;event_name&apos; will return
              &apos;event.model.event_name&apos;
            </li>
          </ul>

          <Heading level={2}>If called without context:</Heading>

          <p>
            A datalayer property at the time of script execution is returned.
          </p>
          <p>
            In the case of no context and an empty property, the complete data
            layer JSON object will be returned (read directly from the page).
          </p>
        </>
      )}
    />
  );
};

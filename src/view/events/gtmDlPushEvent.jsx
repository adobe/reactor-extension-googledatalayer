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

import { RadioGroup, Radio, Flex, Heading } from '@adobe/react-spectrum';
import { useFormContext, Controller } from 'react-hook-form';
import ExtensionView from '../components/extensionView';
import WrappedTextField from '../components/wrappedTextField';
import RegexToggle from '../components/regexToggle';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => {
        const { settings } = initInfo;
        const { method, eventKey, valueIsRegex } = settings || {};

        return {
          method: method || 'specificEvent',
          eventKey,
          valueIsRegex
        };
      }}
      getSettings={({ values: { method, eventKey, valueIsRegex } }) => {
        const settings = {
          method
        };

        if (method === 'specificEvent') {
          if (valueIsRegex) {
            settings.valueIsRegex = true;
          }

          settings.eventKey = eventKey;
        }

        return settings;
      }}
      validate={({ eventKey, method }) => {
        const errors = {};

        if (!eventKey && method === 'specificEvent') {
          errors.eventKey = 'Please provide an event key';
        }

        return errors;
      }}
      render={() => {
        const { control, watch } = useFormContext();
        const [method] = watch(['method']);

        return (
          <>
            <Controller
              control={control}
              name="method"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  label="Listen for"
                  value={value}
                  onChange={onChange}
                >
                  <Radio value="allData">Changes excluding events</Radio>
                  <Radio value="allEvents">All Events</Radio>
                  <Radio value="specificEvent">Specific Event</Radio>
                </RadioGroup>
              )}
            />
            {method === 'specificEvent' && (
              <Flex data-row flex gap="size-100" alignItems="top">
                <WrappedTextField
                  minWidth="size-6000"
                  name="eventKey"
                  label="Specific event to register for"
                  necessityIndicator="label"
                  description={
                    'The event name from the dataLayer. ' +
                    'For example "gtm.load" or a custom event such as "cta-click".'
                  }
                />
                <RegexToggle name="valueIsRegex" marginTop="size-300" />
              </Flex>
            )}
            <Heading level={2}>Examples</Heading>
            <Heading level={3}>Listen to all data changes</Heading>
            <p>
              Listening to all data changes will trigger the rule when data are
              being pushed to the Data Layer (excluding during events).
            </p>
            <p>This push will trigger the rule: </p>
            <div className="code">
              dataLayer.push({'{'}&quot;data&quot;: {'{'}&quot;foo&quot;:
              &quot;bar&quot;, &quot;key&quot;: &quot;value&quot;
              {'}}'})
            </div>
            <p>
              These push elements <strong>will not</strong> trigger the rule:
            </p>{' '}
            <div className="code">
              dataLayer.push({'{'}&quot;event&quot;: &quot;myEvent&quot;{'}'})
            </div>
            <div className="code">
              dataLayer.push({'{'}&quot;event&quot;: &quot;myEvent&quot;,
              &quot;data&quot;: {'{'}&quot;foo&quot;: &quot;bar&quot;,
              &quot;key&quot;: &quot;value&quot;{'}}'})
            </div>
            <Heading level={3}>Listen to all events</Heading>
            <p>
              Listening to all event will trigger the rule when an event are
              being pushed to the Data Layer.
            </p>
            <p>This push will trigger the rule: </p>{' '}
            <div className="code">
              dataLayer.push({'{'}&quot;event&quot;: &quot;myEvent&quot;,
              &quot;data&quot;: {'{'}&quot;foo&quot;: &quot;bar&quot;,
              &quot;key&quot;: &quot;value&quot;{'}}'})
            </div>
            <p>
              This push element <strong>will not</strong> trigger the rule,
              because no &quot;event&quot; key is being pushed:
            </p>{' '}
            <div className="code">
              dataLayer.push({'{'}&quot;data&quot;: {'{'}&quot;foo&quot;:
              &quot;bar&quot;, &quot;key&quot;: &quot;value&quot;
              {'}}'})
            </div>
            <Heading level={3}>Listen to specific event</Heading>
            <p>
              Listening to a specific event will trigger the rule when a
              specific event value is attached to &quot;event&quot; key being
              sent to the Data Layer.
            </p>
            <p>
              If you are listening to &quot;myEvent&quot; this push will trigger
              the rule:
            </p>{' '}
            <div className="code">
              dataLayer.push({'{'}&quot;event&quot;: &quot;myEvent&quot;,
              &quot;data&quot;: {'{'}&quot;foo&quot;: &quot;bar&quot;,
              &quot;key&quot;: &quot;value&quot;{'}}'})
            </div>
            <p>
              This push element <strong>will not</strong> trigger the rule,
              because the value of the &quot;event&quot; key is not the correct
              one:
            </p>{' '}
            <div className="code">
              dataLayer.push({'{'}&quot;event&quot;: &quot;otherEvent&quot;,
              &quot;data&quot;: {'{'}&quot;foo&quot;: &quot;bar&quot;,
              &quot;key&quot;: &quot;value&quot;{'}}'})
            </div>
          </>
        );
      }}
    />
  );
};

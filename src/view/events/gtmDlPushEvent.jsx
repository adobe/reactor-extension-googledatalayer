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
import constants from '../../lib/helpers/constants';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => {
        const { settings } = initInfo;
        const { method, eventKey, valueIsRegex } = settings || {};

        return {
          method: method || constants.METHOD_ALLCHANGES,
          eventKey,
          valueIsRegex
        };
      }}
      getSettings={({ values: { method, eventKey, valueIsRegex } }) => {
        const settings = {
          method
        };

        if (method === constants.METHOD_SPECIFICEVENT) {
          if (valueIsRegex) {
            settings.valueIsRegex = true;
          }

          settings.eventKey = eventKey;
        }

        return settings;
      }}
      validate={({ eventKey, method }) => {
        const errors = {};

        if (!eventKey && method === constants.METHOD_SPECIFICEVENT) {
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
                  <Radio value={constants.METHOD_ALLCHANGES}>
                    All Pushes to the Data Layer
                  </Radio>
                  <Radio value={constants.METHOD_ALLDATA}>
                    Pushes excluding events
                  </Radio>
                  <Radio value={constants.METHOD_ALLEVENTS}>All Events</Radio>
                  <Radio value={constants.METHOD_SPECIFICEVENT}>
                    Specific Event
                  </Radio>
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
            <Heading level={2}>Beware infinite loops!</Heading>
            <p>
              If you listen to the Data Layer and push to it in an action, you
              risk introducing infinite loops, particularly with the option to
              listen for all data pushes.
            </p>
            <Heading level={2}>GTag Type Data Structure</Heading>
            <p>
              Use of the Google Analytics gtag() function will result in a
              datalayer entry that differs from the Google Tag Manager push()
              examples used in the information in this page. Instead of a key
              &quot;event&quot; with a value <em>eventName</em>, gtag pushes an
              event as an array as shown below:
            </p>
            <div className="code">
              0:&quot;event&quot;
              <br />
              1:&quot;page_view&quot;
              <br />
              2:{}
            </div>
            <p>
              The support for this format can be enabled in the extension
              configuration dialog. If not enabled then gtag event pushes will
              pushes will not be recognized as data layer events.
            </p>
            <Heading level={2}>Accessing the Event Object</Heading>
            <p>
              The data element included in the Google Data Layer extension gives
              flexible access to the Data Layer and its elements however, the
              Tags <em>event</em> object can also be exploited. To see this, add
              a custom code action to the Tags rule that uses the Google Data
              Data Layer event listener (this page), containing:
              <pre>console.log(event);</pre> When viewing the browser console
              you can see that, in addition to rule information,
              <em>event.dataLayerModel</em> and <em>event.eventModel</em> are
              available.
            </p>
            <Heading level={2}>Usage Information and Examples</Heading>
            <Heading level={3}>Listen to all pushes</Heading>
            <p>
              Listening to all pushes will trigger the rule when data or events
              are pushed to the Data Layer.
            </p>
            <Heading level={3}>Listen to all data pushes</Heading>
            <p>
              Listening to all data pushes will trigger the rule when data are
              being pushed to the Data Layer, but not during events, i.e. not
              when the event keyword is used.
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
              Listening to all event will trigger the rule when any event is
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

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

'use strict';

const getDataLayer = require('../helpers/getDataLayer');

module.exports = function (settings, event) {
  const dataLayerModel = event && event.event && event.event.dataLayerModel;
  const eventModel = event && event.event && event.event.eventModel;
  const isReturnOnlyEventProps = Boolean(settings.isReturnOnlyEventProps);
  turbine.logger.debug(
    'isReturnOnlyEventProps toggle is set to ' + isReturnOnlyEventProps
  );
  turbine.logger.debug(
    isInDataLayerPushEvent(dataLayerModel)
      ? 'the rule is running in response to a data layer push event'
      : 'the rule is being executed outside a data layer push event'
  );

  let returnValue = '';

  if (hasSettings(settings)) {
    if (!isInDataLayerPushEvent(dataLayerModel)) {
      returnValue = getPropertyFromHelperModel(settings.value);
    } else {
      returnValue = getProperty(
        settings.value,
        eventModel,
        dataLayerModel,
        isReturnOnlyEventProps
      );
    }
  } else {
    if (!isInDataLayerPushEvent(dataLayerModel)) {
      turbine.logger.debug('abstract model computed state was returned');
      returnValue =
        window.extensionGoogleDataLayer.dataLayerHelper.getComputedState();
    } else {
      returnValue = isReturnOnlyEventProps ? eventModel : dataLayerModel;
    }
  }

  return returnValue;

  function hasSettings(settings) {
    return !!settings && settings.value;
  }

  function isInDataLayerPushEvent(dataLayerModel) {
    return !!dataLayerModel;
  }

  function getPropertyFromHelperModel(property) {
    turbine.logger.debug(
      'a property was read from the computed state at the time of rule execution ' +
        JSON.stringify(property)
    );
    return window.extensionGoogleDataLayer.dataLayerHelper.get(property);
  }

  /* when fetching a property try the event object first, then the data layer model */
  function getProperty(
    property,
    eventModel,
    dataLayerModel,
    isReturnOnlyEventProps
  ) {
    if (property) {
      const valueFromEventModel = extractValueFromObject(property, eventModel);
      let value = '';
      if (valueFromEventModel) {
        value = valueFromEventModel;
        turbine.logger.debug(
          'a property was read from the event object after a push event ' +
            JSON.stringify(property + ' = ' + value)
        );
      }
      if (!value && !isReturnOnlyEventProps) {
        value = extractValueFromObject(property, dataLayerModel);
        turbine.logger.debug(
          'a property was read from the computed state after a push event ' +
            JSON.stringify(property + ' = ' + value)
        );
      }
      return value;
    }
  }

  function extractValueFromObject(key, target) {
    const split = key.split('.');
    for (let i = 0; i < split.length; i++) {
      if (target[split[i]] === undefined) return undefined;
      target = target[split[i]];
    }
    return target;
  }
};

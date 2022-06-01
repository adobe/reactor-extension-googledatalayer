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
  const dataLayerModel = event && event.dataLayerModel;
  const eventModel = event && event.eventModel;

  if (hasSettings(settings)) {
    if (!isInTagsEvent(dataLayerModel)) {
      return getPropertyFromRawDatalayer(settings.value);
    } else {
      return getProperty(settings.value, eventModel, dataLayerModel);
    }
  } else {
    if (!isInTagsEvent(dataLayerModel)) {
      return getDataLayer();
    } else {
      return dataLayerModel;
    }
  }

  function hasSettings(settings) {
    return !!settings && settings.value;
  }

  function isInTagsEvent(dataLayerModel) {
    return !!dataLayerModel;
  }

  function getPropertyFromRawDatalayer(property) {
    turbine.logger.debug(
      'a property was read from the current datalayer ' +
        JSON.stringify(property)
    );
    return window.extensionGoogleDataLayer.dataLayerHelper.get(property);
  }

  /* try first to get the property from the current event
if not available get the property from the datalayer model
 */
  function getProperty(value, eventModel, dataLayerModel) {
    if (value) {
      turbine.logger.debug(
        'a property was read from the internal helper model ' +
          JSON.stringify(property)
      );
      return eventModel[value] ? eventModel[value] : dataLayerModel[value];
    }
  }
};

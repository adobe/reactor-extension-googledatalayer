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

const constants = require('../helpers/constants');
const triggers = [];

const handler = function (argEvent) {
  triggers.forEach(function (triggerData) {
    const settings = triggerData.settings;
    const trigger = triggerData.trigger;

    const { method, valueIsRegex, eventKey } = settings;
    const eventModel =
      argEvent && argEvent.detail && argEvent.detail.eventModel;

    const result = {
      event: argEvent.detail
    };

    const eventName = eventModel && eventModel.event;

    if (method === constants.METHOD_ALLCHANGES) {
      trigger(result);
      return;
    }

    if (!eventName) {
      if (method === constants.METHOD_ALLDATA) {
        trigger(result);
      }
      return;
    }

    if (method === constants.METHOD_ALLEVENTS) {
      trigger(result);
      return;
    }

    if (method === constants.METHOD_SPECIFICEVENT) {
      if (valueIsRegex) {
        const re = new RegExp(eventKey);
        if (String(eventName).match(re)) {
          trigger(result);
        }
      } else if (eventKey === eventName) {
        trigger(result);
      }
    }
  });
};

let initializeListener = function () {
  document.body.addEventListener(constants.DATALAYERCHANGE, handler);
  initializeListener = function () {};
};

module.exports = function (settings, trigger) {
  triggers.push({
    settings: settings,
    trigger: trigger
  });

  initializeListener();
};

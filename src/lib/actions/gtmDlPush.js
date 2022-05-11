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

module.exports = function (settings) {
  if (typeof settings !== 'undefined' && settings !== null) {
    const dl = getDataLayer();
    if (dl) {
      try {
        dl.push(JSON.parse(settings.content));
        turbine.logger.debug('Successfully pushed JSON into DL');
      } catch (e) {
        turbine.logger.error('Could not push content into DL' + e.message);
      }
    } else {
      turbine.logger.error('Could not find the DL');
    }
  }
};

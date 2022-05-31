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

module.exports = function (settings, event) {
  const dlName = turbine.getExtensionSettings().dataLayer;
  const datalayerModel = event && event.event && event.event.dataLayerModel;

  Object.keys(window[dlName]).forEach((key) => {
    if (typeof window[dlName][key] !== 'function') {
      delete window[dlName][key];
    }
  });
  window[dlName].length = Object.keys(window[dlName]).length;

  if (datalayerModel) {
    const dataLayerTrimmed = window[dlName];
    window[dlName] = Object.assign({}, dataLayerTrimmed, datalayerModel);
    turbine.logger.log('Setting window.' + dlName + ' to computedState');
  } else {
    turbine.logger.log(
      'Setting window.' + dlName + ' to empty (no computed state available)'
    );
  }
};

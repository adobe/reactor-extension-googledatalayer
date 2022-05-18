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

/*
set/get datalayer from window object as this is Google standard
support for multiple data layers in backlog:
https://github.com/adobe/reactor-extension-googledatalayer/issues/1
*/

module.exports = () => {
  const name = turbine.getExtensionSettings().dataLayer;
  window[name] = window[name] || [];
  return window[name];
};

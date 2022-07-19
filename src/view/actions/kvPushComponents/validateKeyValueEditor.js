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

export default (values) => {
  const errors = {};
  const configuredParameters = [];

  (values.parameters || []).forEach((parameter, index) => {
    if (parameter.key && !parameter.value) {
      errors[`parameters[${index}][value]`] = 'Please provide a value';
    } else if (!parameter.key && parameter.value) {
      errors[`parameters[${index}][key]`] = 'Please provide a key';
    }

    if (configuredParameters.indexOf(parameter.key) !== -1) {
      errors[
        `parameters[${index}][key]`
      ] = `Key ${parameter.key} is already configured`;
    } else if (parameter.key) {
      configuredParameters.push(parameter.key);
    }
  });

  return errors;
};

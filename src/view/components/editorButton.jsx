/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React from 'react';
import { Button, Text } from '@adobe/react-spectrum';
import Code from '@spectrum-icons/workflow/Code';

const onClick = ({ onChange, value, language, placeholder }) => {
  const options = {
    code: value || placeholder || ''
  };

  if (language) {
    options.language = language;
  }

  window.extensionBridge.openCodeEditor(options).then((updatedCode) => {
    // A bug exists in the Launch UI where the promise is resolved
    // with undefined if the user hits Cancel. In this case, the promise
    // should never be resolved or rejected.
    // https://jira.corp.adobe.com/browse/DTM-14454
    if (updatedCode === undefined) {
      return;
    }

    // If the user never changed placeholder code, don't save the placeholder code.
    if (placeholder && updatedCode === placeholder) {
      updatedCode = '';
    }

    onChange(updatedCode);
  });
};

export default ({
  onChange,
  value,
  language,
  placeholder,
  text = 'Open Editor',
  ...rest
}) => (
  <Button
    variant="primary"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    onPress={() => onClick({ onChange, value, language, placeholder })}
  >
    <Code />
    <Text marginStart="size-50">{text}</Text>
  </Button>
);

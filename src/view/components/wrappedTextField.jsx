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

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ActionButton, TextField } from '@adobe/react-spectrum';
import Data from '@spectrum-icons/workflow/Data';
import ValidationWrapper from './validationWrapper';

const addDataElementToken = (value, dataElementToken) =>
  `${value || ''}${dataElementToken}`;

const openDataElementSelector =
  (tokenize, name, { getValues, setValue }, onChange) =>
  () => {
    // Whenever we're dealing with a data element token, we add it to whatever the existing value
    // is. If we're not dealing with a token, we replace the value entirely. This is just due
    // to how we want the UX to flow.
    window.extensionBridge
      .openDataElementSelector({
        tokenize
      })
      .then((dataElement) => {
        const newValue = tokenize
          ? addDataElementToken(getValues(name), dataElement)
          : dataElement;

        setValue(name, newValue, { shouldValidate: true, shouldDirty: true });
        if (onChange) {
          onChange(newValue);
        }
      });
  };

export default ({
  component: Component = TextField,
  name: componentName,
  onChange: componentOnChange,
  onBlur: componentOnBlur,
  supportDataElement,
  defaultValue = '',
  width = 'auto',
  ...rest
}) => {
  const methods = useFormContext();

  return (
    <Controller
      name={componentName}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <ValidationWrapper width={width}>
          <Component
            width={width}
            name={name}
            onBlur={(e) => {
              onBlur(e);
              if (componentOnBlur) {
                componentOnBlur(e);
              }
            }}
            onChange={(e) => {
              onChange(e);
              if (componentOnChange) {
                componentOnChange(e);
              }
            }}
            value={value}
            inputRef={ref}
            autoComplete="off"
            {...rest}
          />

          {supportDataElement && (
            <ActionButton
              aria-label="Open data element selector"
              alignSelf="center"
              marginStart="size-65"
              onPress={openDataElementSelector(
                supportDataElement,
                name,
                methods,
                componentOnChange
              )}
            >
              <Data />
            </ActionButton>
          )}
        </ValidationWrapper>
      )}
      {...rest}
    />
  );
};

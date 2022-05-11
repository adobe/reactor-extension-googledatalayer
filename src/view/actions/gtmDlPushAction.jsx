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
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View } from '@adobe/react-spectrum';
import EditorButton from '../components/editorButton';
import ExtensionView from '../components/extensionView';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => {
      const { settings } = initInfo;
      const { content } = settings || {};

      return {
        content
      };
    }}
    getSettings={({ values: { content } }) => ({
      content
    })}
    validate={({ content }) => {
      const errors = {};

      if (!content) {
        errors.content = 'Please provide a valid JSON';
      }

      try {
        JSON.parse(content);
      } catch (e) {
        errors.content = 'Please provide a valid JSON';
      }

      return errors;
    }}
    render={() => {
      const {
        control,
        formState: { errors },
        trigger
      } = useFormContext();

      return (
        <Controller
          control={control}
          name="content"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <EditorButton
                text="Open JSON Editor"
                onChange={(code) => {
                  onChange(code);
                  trigger('content');
                }}
                value={value}
                language="json"
                variant={errors.content ? 'negative' : 'primary'}
              />
              {errors.content && (
                <View UNSAFE_className="error">
                  <Text
                    marginStart="size-50"
                    UNSAFE_style={{
                      'font-size':
                        'var(--spectrum-global-dimension-font-size-75)'
                    }}
                  >
                    {errors.content}
                  </Text>
                </View>
              )}
            </>
          )}
        />
      );
    }}
  />
);

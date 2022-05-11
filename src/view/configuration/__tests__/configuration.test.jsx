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

import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderView from '../../__tests_helpers__/renderView';
import { inputOnChange } from '../../__tests_helpers__/jsDomHelpers';

import Configuration from '../configuration';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = () => ({
  dataLayerTextfield: screen.queryByLabelText(/data layer/i)
});

describe('configuration view', () => {
  test('sets form values from settings', async () => {
    renderView(Configuration);

    await act(async () => {
      extensionBridge.init({
        settings: {
          dataLayer: 'foo'
        }
      });
    });

    const { dataLayerTextfield } = getFromFields();
    expect(dataLayerTextfield.value).toBe('foo');
  });

  test('sets settings from form values', async () => {
    renderView(Configuration);

    await act(async () => {
      extensionBridge.init();
    });

    const { dataLayerTextfield } = getFromFields();
    inputOnChange(dataLayerTextfield, 'foo');

    expect(extensionBridge.getSettings()).toEqual({
      dataLayer: 'foo'
    });
  });

  test('sets errors if required values are not provided', async () => {
    renderView(Configuration);

    await act(async () => {
      extensionBridge.init();
    });

    const { dataLayerTextfield } = getFromFields();
    inputOnChange(dataLayerTextfield, '');

    await act(async () => {
      expect(extensionBridge.validate());
    });

    expect(dataLayerTextfield).toHaveAttribute('aria-invalid', 'true');
  });
});

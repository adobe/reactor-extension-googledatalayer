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

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View } from '@adobe/react-spectrum';
import PropTypes from 'prop-types';
import ErrorBoundary from './errorBoundary';
import RenderCycleContext from './renderCycleContext';
import getUniqueKeyGenerator from '../utils/getUniqueKeyGenerator';
// import DisplayFormState from './displayFormState';

const generateNewKey = getUniqueKeyGenerator('cycle');

const generateNewRenderCycle = (() => {
  let generateNewKeyNextTime = false;

  return (setKey) => {
    if (generateNewKeyNextTime) {
      setKey(generateNewKey());
    } else {
      generateNewKeyNextTime = true;
    }
  };
})();

const initialKey = generateNewKey();

const ExtensionView = ({
  getInitialValues,
  getSettings,
  validate,
  render: RenderComp
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [renderedCycle, setRenderedCycle] = useState(initialKey);

  const methods = useForm({
    mode: 'onTouched',
    shouldUnregister: false,
    resolver: (values) => ({ values, errors: validate(values) })
  });

  useEffect(() => {
    let initInfo;

    window.extensionBridge.register({
      init: (_initInfo = {}) => {
        setIsInitialized(false);

        initInfo = _initInfo;

        methods.reset(getInitialValues({ initInfo }));

        // We want to rerender the component on every
        // init call after the initial one.
        generateNewRenderCycle(setRenderedCycle);

        setIsInitialized(true);
      },

      getSettings: () =>
        getSettings({
          values: methods.getValues(),
          initInfo
        }),

      validate: () => methods.trigger()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInitialized ? (
    <RenderCycleContext.Provider value={renderedCycle}>
      <View margin="size-200" key={renderedCycle}>
        <ErrorBoundary>
          <FormProvider
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...methods}
          >
            <form>
              <RenderComp />
            </form>
            {/* <DisplayFormState /> */}
          </FormProvider>
        </ErrorBoundary>
      </View>
    </RenderCycleContext.Provider>
  ) : null;
};

ExtensionView.propTypes = {
  getInitialValues: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  validate: PropTypes.func,
  validationSchema: PropTypes.object,
  render: PropTypes.func.isRequired
};

export default ExtensionView;

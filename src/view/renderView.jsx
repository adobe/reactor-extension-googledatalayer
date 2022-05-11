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

/* istanbul ignore file */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, lightTheme } from '@adobe/react-spectrum';

import './global.styl';

export default (View) => {
  const container = document.getElementById('content');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <Provider colorScheme="light" theme={lightTheme}>
      <View />
    </Provider>
  );
};

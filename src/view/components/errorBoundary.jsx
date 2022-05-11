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

import React, { Component } from 'react';
import ErrorMessage from './errorMessage';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(/*error, info*/) {
    // You can also log the error to an error reporting service
    // console.error(error, info);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      // You can render any custom fallback UI
      return <ErrorMessage message={error.message} />;
    }

    return children;
  }
}

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

import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const changePickerValue = async (select, newValue) => {
  await userEvent.click(select);

  const listbox = await screen.findByRole('listbox');
  const items = await within(listbox).findAllByRole('option');

  const option = items.filter((i) => i.textContent === newValue)[0];

  userEvent.click(option);
};

export const findComboBoxOption = async (comboboxInput, optionText) => {
  await userEvent.type(comboboxInput, optionText);

  const listbox = await screen.findByRole('listbox');
  const items = within(listbox)
    .getAllByRole('option')
    .filter((o) => o.textContent === optionText);

  return items[0];
};

export const changeComboBoxValue = async (comboboxInput, newValue) => {
  const option = await findComboBoxOption(comboboxInput, newValue);
  userEvent.click(option);
};

export const inputOnChange = (input, value) =>
  fireEvent.change(input, {
    target: { value }
  });

export const changeToggleValue = async (toggleInput) => {
  await userEvent.click(toggleInput);
};

# Google Data Layer extension for Adobe Experience Platform Tags

## Overview

This extension allows Adobe Experience Platform Tags (fka Launch) to use a Google data layer, either independently or simultaneously with Google solutions, and using the same logic; Google's open source Data Layer _Helper_ library. The _Helper_ library provides similar Event Driven functionality to the Adobe Client Data Dayer (ACDL). The data elements, rules and actions of the extension provide similar functionality to those in the [ACDL extension](https://github.com/pitchmuc/acdl_extension).

## Use Case

The Google data layer extension is intended to support the use case of Google and Adobe data consumers on the same web page and provide both with a single source of data truth. The following scenarios may result in this:

- Google solutions are deployed using Tags (for example via [Acronym's Gtag extension](https://www.adobeexchange.com/experiencecloud.details.101437.google-global-site-tag-gtag.html))
- Google solutions directly added in page, eg. GTag code in the header.
- Two tag managers, Tags and Google Tag Manager on the same page (double tagging). While poor practice this is a necessity under some circumstances, for example Google -> Adobe migration.

## Compatibility with AEP / XDM

The extension is fully compatible with a Platform Web SDK / XDM implementation, as XDM mapping is not affected by the choice of data layer. The extension was originally developed to support adoption of Web SDK in a primarily Google environment.

## Simultaneous Data Layer Access Risk

The extension does not change the data layer unless a push is made, nor interact with other Helper objects (such as the internal GTM Helper). The Helper object used by launch to monitor the data layer for changes is separate from other Helpers accessing the data layer, and maintains and operates on an internal model of the data layer; so an event on the data layer is caught and processed independently in each Helper object. An example of this is seen when the history of past data layer events is processed - each Helper maintains its own history.

## Event Integrity

A key function of an Event Driven Data Layer (EDDL) is to allow stable-state 'snapshots' of the data layer to be processed independently of ongoing data layer activity. To achieve this the GDL _Helper_ object maintains the data layer computed state (an internal model of the data layer) and passes a copy of this state to a Tags rule whenever the data layer state changes (a _push_ event); so allowing Tags to process the event-specific 'snapshot' in a Rule.
This functionality ensures that multiple rapid events do not conflict during near simultaneous writing to the data layer, as they could if code accessed the data layer directly.

The Tags extension _data elements_ and related _actions_ do make use of the stable model of the data layer whenever the extension _event_ dialog is used to configure a data layer listener.

## Use of Data Elements and Actions in General Tags Rules

When Tags rules fire on events that are not related to the data layer such as _Library Loaded_, the _actions_ and _data elements_ of the GDL extension are still available and function in the same way, but return values from the data layer computed state at the time of rule execution.

## Event History

When the data layer extension is loaded in the page, any previous data layer events will be processed, this avoiding the issue of missed events resulting from load order; particularly a concern in asynchronous load scenarios.

## Capabilties

The data extension provides:

- Injection of _Helper_ library
- Configuration of data layer name
- A Data Element for accessing Data Layer computed state and event values.
- A listener event to catch data layer events and changes.
- An action to support dataLayer push
- An action to reset the datalayer to the computed state if available (v1.1.1+)
- An action to push to the data layer using a key/value multified dialog (v1.2+)

## More information

[This Adobe Tech Blog article](https://medium.com/adobetech/adobe-experience-platform-tags-extension-for-google-data-layers-2349b1fd101e) looks in detail and the EDDL functionality, use cases and deployment of the Adobe Google Data Layer extension.

The extension rule event and data element dialogs themselves contain detail about the use of each.

## Source Projects

This project uses code from the following projects:

[Google Helper project](https://github.com/google/data-layer-helper)

[ACDL Extension](https://github.com/pitchmuc/acdl_extension)

## Development

To start the Launch Sandbox and build the software, clone then repo, install node/npm if necessary, then run the rollowing in the project root:

npm install

npm run sandbox

For other npm scripts see the package.json

## Contribution

We welcome contributions! Please see the included [contribution page](./CONTRIBUTING.md).

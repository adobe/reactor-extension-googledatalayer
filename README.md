# Reactor Google Data Layer Extension

The Google Data Layer extension is a beta.

## Overview

The extension allows Launch (AEP Tags) to use a Google data layer, either independently or simultaneously with Google solutions, and using the same logic; Google's open source Data Layer _Helper_ library. The _Helper_ library provides similar Event Driven functionality to the Adobe Client Data Dayer (ACDL). The data elements, rules and actions of the extension provide similar functionality to those in the [ACDL extension](https://github.com/pitchmuc/acdl_extension).

## Use Case

The Google data layer extension is intended to support the use case of Google and Adobe data consumers on the same web page and provide both with a single source of data truth. The following scenarios may result in this:

- Google solutions are deployed using AEP Tags (for example via [Acronym's Gtag extension](https://www.adobeexchange.com/experiencecloud.details.101437.google-global-site-tag-gtag.html))
- Google solutions directly added in page, eg. GTag code in the header.
- Two tag managers, AEP Tags and Google Tag Manager on the same page (double tagging). While poor practice this is a necessity under some circumstances, for example Google -> Adobe migration.

## Comparison with using a shared Adobe Data Layer

Google technology is tightly coupled to the Google data layer and one is automatically created by Google solutions if not present. AEP Tags is explicitly data layer agnostic and will not inject a data layer without addition code or a data layer extension. Shared use of the Google Data Layer is therefore the obvious choice.

## Compatibility with AEP / XDM

The extension is fully compatible with an AEP / XDM implementation, as XDM mapping is not affected by the choice of data layer. The extension was originally developed to support adoption of AEP in a primarily Google environment.

## Simultaneous Data Layer Access Risk

The extension does not change the data layer unless a push is made, nor interact with other Helper objects (such as the internal GTM Helper). The Helper object used by launch to monitor the data layer for changes is separate from other Helpers accessing the data layer, and maintains and operates on an internal model of the data layer; so an event on the data layer is caught and processed independently in each Helper object. An example of this is seen when the history of past data layer events is processed - each Helper maintains its own history.

The extension is however still in beta, and despite extensive testing, unwanted interference between multiple data layer consumers cannot be fully ruled out.

## Event Integrity

A key function of an Event Driven Data Layer (EDDL) is to allow stable-state 'snapshots' of the data layer to be processed independently of ongoing data layer activity. The GDL _Helper_ object maintains an internal model of the data layer and passes a copy of this model to a Tags rule whenever the data layer state changes (a _push_ event); so allowing Tags to capture the 'snapshot' in an Rule, and access the model of the data layer in a stable state.

This functionality ensures that multiple rapid events do not conflict during near simultaneous writing to the data layer, as they could if code accessed the data layer directly.  

The AEP Tags extension _data elements_ and related _actions_ do make use of the stable model of the data layer whenever the extension _event_ dialog is used to configure a data layer listener. 

## Use of Data Elements and Actions in General Tags Rules

When Tags rules fire on events that are not related to the data layer such as _Library Loaded_, the _actions_ and _data elements_ of the GDL extension are still available, but will access the live data layer directly, as no stable state 'snapshot' is available.  

## Computed State

A term also used in the context of EDDLs is Computed State.  The Computed State of the data layer is the object that contains the merged values of all properties in the data layer.  The most recent values of any given property are retained.  This is relevant to an _action_ provided by the extension, which resets the data layer to the Computed State.   

## Event History

When the data layer extension is loaded in the page, any previous data layer events will be processed, this avoiding the issue of missed events resulting from load order; particularly a concern in asynchronous load scenarios.

## Capabilties

The data extension provides:

- Injection of _Helper_ library
- Configuration of data layer name
- A Data Element for accessing Data Layer values.
- A listener event to catch data layer events and changes.
- An action to support dataLayer push
- An action to reset the datalayer to the computed state if available

## Source Projects

This project uses code from the following projects:

[Google Helper project](https://github.com/google/data-layer-helper)

[ACDL Extension](https://github.com/pitchmuc/acdl_extension)

[Valtech AEP Tags Google Data Layer Extension](https://github.com/valtech-ch/aeptags-google-datalayer-extension)

## Development

To start the Launch Sandbox and build the software, clone then repo, install node/npm if necessary, then run the rollowing in the project root:

npm install

npm run sandbox

For other npm scripts see the package.json

## Contribution

We welcome contributions! Please see the included [contribution page](./CONTRIBUTING.md).

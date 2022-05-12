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

A key function of an Event Driven Data Layer is to process snapshots of the data layer when an event is caught, ie. within the context of an event. This ensures that multiple rapid events do not conflict during near simultaneous handling and result in an erroneous read of data in the data layer. The AEP Tags extension _data elements_ and related _actions_ do respect this and process the data layer in the context of individual events. For example if a series of events are written to the data layer almost simultaneously, each is caught and processed separately using the state of the datalayer at the time the event fired.

It is also possible to do a simple read of the data layer outside the context of an event.

## Event History

When the data layer extension is loaded in the page, any previous data layer events will be processed, this avoiding the issue of missed events resulting from load order; particularly a concern in asynchronous load scenarios.

## Capabilties

The data extension provides:

- Injection of _Helper_ library
- Configuration of data layer name
- A Data Element for accessing Data Layer values.
- A listener event to catch data layer events and changes.
- An action to support dataLayer push

## Source Projects

This project uses code from the following projects:

[Google Helper project](https://github.com/google/data-layer-helper)

[ACDL Extention](https://github.com/pitchmuc/acdl_extension)

[Valtech AEP Tags Google Data Layer Extension](https://github.com/valtech-ch/aeptags-google-datalayer-extension)

## Development

To start the Launch Sandbox and build the software, clone then repo, install node/npm if necessary, then run the rollowing in the project root:

npm install

npm run sandbox

For other npm scripts see the package.json

## Contribution

We welcome contributions! Please see the included [contribution page](../CONTRIBUTING.md).

## Functional Detail

The complex part of the behaviour stems from the difference between data pushed to the data layer using the 'event:' keyword, and normal data pushed to the DL. Anything with the event keyword is a special case, and results in the creation of two objects by the Google Helper, which are passed as payload of the Custom Javascript Event that it fires. When this event is caught in a Launch rule, the Data Element dialog can be used to access the properties.

The screenshot shows the Helper code defining these two payload objects in the parent 'detail' object.

![googledatalayer-detail-impl](https://user-images.githubusercontent.com/105236069/168050189-3123127a-94df-492f-bf78-1484bb1cf11a.png)

An example event object is:

{
"event": "gaEvent",
"event_name": "navigation",
"navigation": {
"event_category": "demo_navigation",
"event_action": "demo button click",
"event_label": "fire navigation event",
"navigation_item": "button"
}
}

A Data Element will first check for its defined parameter in this object, if present.

If there is no _eventModel_ object, then there has been a push to the data layer without using the 'event' keyword. Data Elements will be drawn from the _dataLayerModel_ obect, a complete 'snapshot' of the data layer.

If a Data Element is used when no data layer activity is being processed, for example in the browser console using _satellite.getVar()_, then the Data Element will return data from the actual data layer (via the Helper), rather than from an event specific 'snapshot'.

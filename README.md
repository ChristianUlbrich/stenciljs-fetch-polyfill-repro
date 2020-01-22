# stenciljs-fetch-polyfill-repro
This repo is a reproduction case for StencilJS' embedded `fetch()` polyfill not being loaded if the StencilJS component is loaded via the [recommended way](https://stenciljs.com/docs/react) for React Apps.

This is a problem for all browsers currently not supporting `fetch()` out of the box, namely Internet Explorer 11 being the last one of the major browsers:

* -> https://caniuse.com/#feat=fetch

The actual problem is, that the _bundling_ process of `create-react-app` splits the code for the fetch polyfill into a _chunk_ that never gets loaded _before_ a component using `fetch()` gets loaded.

## Reproduction
**Requirements:** _Contemporary_ _NodeJS_ (tested with 12) and _yarn_ (although it _should_ work without):

1. build the simple StencilJS-based web component doing a fetch call:
    * `npm run build:component`
    * _(optional)_ verfiy that it is working by running `npm run start:component`
2. run the simple plain direct integration by `npm run start:pure`
    * verify that it works, by opening http://localhost:8080 **and** clicking fetch
    * -> you should see an image
3. run the react-integration by running `npm run start:react`
    * verify that it does not work (on IE11), by opening http://localhost:8080 **and** clicking fetch
    * -> you should see an image

## Hints
You can easily verify this by looking at the generated _chunks_ in [stenciljs-react/build](stenciljs-react/build):
* `3.0632f09b.chunk.js` contains the `fetch()` polyfill
* `6.ce6252df.chunk.js` contains the web component using fetch

When you `npm run start:react` you will see, that `3.0632f09b.chunk.js` is **never** loaded and thus calling any `fetch()` will fail at this point.


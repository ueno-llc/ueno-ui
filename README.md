# ueno-ui

## How to extend css of components

```js
import React, { Component } from 'react';
import { Button } from 'ueno-ui';

import s from 'styles/overwrite-button.scss';

// ./shared/styles/overwrite-button.scss
// .button {
//   font-size: 50px;
// }

const Example = () => (
  <div>
    <Button>My button</Button>
    <Button styles={s.button}>My custom button</Button>
  </div>
);
```

## Development

When working on ueno-ui along side another project, it's useful to link:

```bash
> cd ueno-ui
> yarn link
> cd ../other-project
> yarn link "ueno-ui"
```

then while developing in ueno-ui, storybook can be used via `yarn storybook` to get changes reflected in link project, run `yarn prepublish` to build.

## Publish

```bash
> npm login # use ueno account
> npm version minor # or patch for fixes
> npm publish
```

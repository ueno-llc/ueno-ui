# ueno-ui

## Super simple example

```js
import React from 'react';
import { UenoButton } from 'ueno-ui';

const Example = () => <UenoButton to="https://ueno.co">Ueno button</UenoButton>;
```

## How to extend css of components

Most of our components has a `className` props where you can pass customs styles. For example `<UenoButton />`, `<Input />` or also `<Field />` have a `className` props.
We need to display them differently through our projects so we keep components' styles in the ui here, and we take care of the positionning on the project itself with the `className`.

```js
import React from 'react';
import { UenoButton } from 'ueno-ui';

import s from 'styles/overwrite-button.scss';

// ./shared/styles/overwrite-button.scss
// .button {
//   font-size: 50px;
// }

const Example = () => <UenoButton to="https://ueno.co" className={s.button}>Ueno button with some custom styles</UenoButton>;
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

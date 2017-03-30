# ueno-ui

### How to extend css of components

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

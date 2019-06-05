import React from 'react';
import { storiesOf } from '@storybook/react';
import Example from '../examples/Example';
import Cart from '../examples/Cart';

storiesOf('Simple examples', module)
  .add('Example 1', () => (<Example/>));

storiesOf('Simple examples', module)
  .add('Cart', () => <Cart/>);
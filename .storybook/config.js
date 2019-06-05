import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/examples.stories');
}

configure(loadStories, module);
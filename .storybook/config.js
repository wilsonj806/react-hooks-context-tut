import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/examples.stories');
  require('../src/stories/components.stories');
}

configure(loadStories, module);
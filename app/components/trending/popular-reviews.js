import BaseComponent from 'client/components/trending/-base';
import get from 'ember-metal/get';
import { task } from 'ember-concurrency';
import { capitalize } from 'ember-string';
import FlickityActionsMixin from 'client/mixins/flickity-actions';

export default BaseComponent.extend(FlickityActionsMixin, {
  classNames: ['popular-reviews'],
  currentTab: 'anime',

  getDataTask: task(function* (type) {
    return yield get(this, 'store').query('review', {
      filter: {
        media_type: capitalize(type)
      },
      include: 'user,media',
      sort: '-likes_count',
      page: { limit: 14 }
    });
  }).restartable()
});

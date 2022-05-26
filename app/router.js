import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments)
    // call event everytime route changes
    this.on('routeDidChange', () => {
      this._super(...arguments);
      window.scrollTo(0, 0); // scrolls to top
    });
  }
}

Router.map(function () {
  this.route('/');
});

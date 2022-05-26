import Authenticator from 'ember-simple-auth/authenticators/base';
import {Promise} from 'rsvp';
import {inject as service} from '@ember/service';

export default class SSOAuthenticator extends Authenticator {
  @service driverportalWorkspace;

  authenticate(email) {
    return new Promise(async (resolve) => {
      const token = this.driverportalWorkspace.API.TOKEN;
      const body = {
        token,
        email
      };
      const tokenParts = body.token.split('.');
      const tokenInfo = JSON.parse(atob(tokenParts[1]));
      body.tokenInfo = tokenInfo;
      resolve(body);
    })
  }

}



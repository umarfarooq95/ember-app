import Authenticator from 'ember-simple-auth/authenticators/base';
import {Promise} from 'rsvp';
import {inject as service} from '@ember/service';
import fetch from 'fetch';
import {getAPIURL} from 'driver-portal/utils/app-util';
export default class SSOAuthenticator extends Authenticator {
  @service driverportalWorkspace;

  authenticate(userName, password) {
    let host = this.driverportalWorkspace.API.SSO_API_URL;
    let url = host + '/dpapi/ui/login';
    url = getAPIURL(url);

    let data = {"username": userName, "password": password.toString()};
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(userName + ":" + password)
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    return new Promise((resolve, reject) => {
      fetch(url, options).then(response => {
        response.json().then(body => {
          if (!response.ok) {
            console.log('User Authentication failed.'); //eslint-disable-line no-console
            reject(body.message);
          } else {

            const tokenParts = body.token.split('.');
            const tokenInfo = JSON.parse(atob(tokenParts[1]));
            body.exp = tokenInfo.exp;
            body.userId = tokenInfo.UserId;
            body.permissions = tokenInfo.permissions;
            body.tokenInfo = tokenInfo;
            resolve(body);
          }
        });
      }).catch(reject);
    });

  }

  restore(data) {
    const currentTime = Date.now() / 1000;

    // expired JWT invalidate session
    if (currentTime >= data.exp) {
      console.log('Token has expired.'); //eslint-disable-line no-console
      return Promise.reject(data);
    }

    return Promise.resolve(data);
  }
}

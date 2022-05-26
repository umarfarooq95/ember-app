module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'driver-portal',
    environment,
    podModulePrefix: 'driver-portal/pods',
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    API: {
      driverMaxLimit: 100,
      attributeMaxLimit: 100,
      vehicleMaxLimit: 100,
      userMaxLimit: 100,
      zoneMaxLimit: 100
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      localFilteringEnabled: true,
      dummyServiceEnabled : false,
      paginationEnabled: true,
      fullMode: true,
      TB_TMAPI: true,
      TOMTOM_MODE: 'shortest'
    },
    tomtom: {
      search: {
        searchKey: 'TpUwwAHj8yKApZVhHAAw1dlTzAQVOnnj',
        countrySet: ['FI', 'CA', 'US'],
        center: { lat: 22.7196, lon: 75.8577 },
        radius: 10000,
        view: 'IN'
      },
      key: 'TpUwwAHj8yKApZVhHAAw1dlTzAQVOnnj',
      basePath: '/assets/tomtom',
      // basePath not used on styleUrlMapping values
      styleUrlMapping: {
        main: {
          basic: '/assets/tomtom/styles/basic_main.json',
          hybrid: '/assets/tomtom/styles/hybrid_main.json',
          labels: '/assets/tomtom/styles/labels_main.json'
        },
        night: {
          basic: '/assets/tomtom/styles/basic_night.json',
          hybrid: '/assets/tomtom/styles/hybrid_night.json',
          labels: '/assets/tomtom/styles/labels_night.json'
        }
      },
      source: 'vector'
    },
    dateTimeFormat: {
      dateTimeMoment: 'hh:mm YYYY-MM-DD',
      dateTimeFlatPickr:  'd.m.Y',
      newDateFormat:'DD.MM.YYYY',// for resetting date string value, dateTimeFlatPickr not working, bug for flatpickr
      newTimeFormat: 'HH:mm',
      dateMoment: 'YYYY-MM-DD',
      dateFlatPickr: 'Y-m-d',
      timeMoment: 'hh:mm A',
      timeFlatPickr: 'h:i K'
    },
    workspaceContext: {
      startDate: new Date(),
      endDate: new Date()
    },

    phoneInput: {
      lazyLoad: true,    // default false
      hasPrepend: false  // default false
    }
  };
  if (environment === 'development') {
    ENV.tomtom.styleUrlMapping.main.basic = ENV.rootURL + '/assets/tomtom/styles/basic_main.json';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }
  if (environment === 'production') {
    ENV.tomtom.styleUrlMapping.main.basic = ENV.rootURL + '/assets/tomtom/styles/basic_main.json';
    // here you can enable a production-specific feature
    ENV.phoneInput.hasPrepend = true;
  }
  return ENV;
};

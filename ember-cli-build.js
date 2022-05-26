'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const defaultEmberAppOptions = {
  'ember-bootstrap': {
    'bootstrapVersion': 4.5,
    'importBootstrapFont': false,
    'importBootstrapCSS': false
  },
  fingerprint: {
    exclude: ['driver-portal-icons/images', 'driverprotal/driver-portal-icons/images']
  },
  sassOptions: {
    includePaths: [
      'app'
    ]
  },
  inlineContent: {
    config: './api-urls.js',
  },
  outputPaths: {
    app: {
      css: {
        '/app': '/assets/style.css',
      }
    }
  },
  // babel: {
  //   plugins: [
  //     'transform-class-properties',
  //     'transform-react-jsx'
  //   ]
  // }
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults,
     defaultEmberAppOptions
    // Add options here
  );

  // md5 hashing
  app.import('node_modules/md5/md5.js', {
    using: [{transformation: 'cjs', as: 'md5'}]
  });

  app.import('node_modules/keycode/index.js', {
    using: [{transformation: 'cjs', as: 'keycode'}]
  });
  app.import('node_modules/point-in-polygon/index.js', {
    using: [{transformation: 'cjs', as: 'pointInPolygon'}]
  });

  // // react
  // app.import('node_modules/react/umd/react.production.min.js');
  //
  // app.import('node_modules/react-dom/umd/react-dom.production.min.js');
  //
  // app.import('node_modules/prop-types/prop-types.min.js');
  //
  // // ember generate vendor-shim
  // app.import('vendor/shims/react.js');
  // app.import('vendor/shims/react-dom.js');
  // app.import('vendor/shims/prop-types.js');
  //
  // app.import('node_modules/react-virtualized/dist/umd/react-virtualized.js');
  // app.import('vendor/shims/react-virtualized.js');
  //
  // app.import('node_modules/react-draggable/build/web/react-draggable.min.js');
  // app.import('vendor/shims/react-draggable.js');
  //
  // app.import('node_modules/react-sortable-hoc/dist/react-sortable-hoc.umd.js');
  // app.import('vendor/shims/react-sortable-hoc.js');

  // tomtom
  app.import('vendor/tomtom/tomtom.min.js');
  app.import('vendor/shims/tomtom.js');
  app.import('vendor/tomtom/turf.min.js');
  app.import('vendor/tomtom/map.css');



  // leaflet plugins
  app.import('vendor/leaflet/leaflet.polylineDecorator.js');
  app.import('vendor/leaflet/leaflet.rotatedMarker.js');

  const tomtomFolders = ['glyphs', 'images', 'sprites', 'styles'];
  const tomtomAssets = tomtomFolders.map((folder) => {
    return new Funnel('vendor', {
      srcDir: `/tomtom/${folder}`,
      destDir: `/assets/tomtom/${folder}`
    });
  });
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree(tomtomAssets);
};

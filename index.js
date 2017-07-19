function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex_banksetservice', 'allex:funddistributionbankextension:lib']
    },
    sinkmap: {
      dependencies: ['allex_banksetservice']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;

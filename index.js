function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex:bankset', 'allex:funddistributionbankextension:lib']
    },
    sinkmap: {
      dependencies: ['allex:bankset']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;

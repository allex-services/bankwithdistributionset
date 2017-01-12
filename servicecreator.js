function createBankWithDistributionSetService(execlib, ParentService, FundDistributionExtension) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;
  
  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function BankWithDistributionSetService(prophash) {
    ParentService.call(this, prophash);
    FundDistributionExtension.call(this, prophash);
  }
  
  ParentService.inherit(BankWithDistributionSetService, factoryCreator);
  FundDistributionExtension.addMethods(BankWithDistributionSetService);
  
  BankWithDistributionSetService.prototype.__cleanUp = function() {
    FundDistributionExtension.prototype.destroy.call(this);
    ParentService.prototype.__cleanUp.call(this);
  };

  function distributionSetter (distributionhash, referencearray, bank) {
    if (!bank.setDistribution) {
      throw new lib.Error('INTERNAL_BANK_FETCH_ERROR');
    }
    var ret = bank ? bank.setDistribution(distributionhash, referencearray) : false;
    distributionhash = null;
    referencearray = null;
    return ret;
  }

  BankWithDistributionSetService.prototype.setDistribution = function (bankname, distributionhash, referencearray) {
    return qlib.promise2decision(this.getOrCreateBank(bankname), distributionSetter.bind(null, distributionhash, referencearray));
  };

  function distributor (amount, referencearray, bank) {
    if (!bank.distribute) {
      throw new lib.Error('INTERNAL_BANK_FETCH_ERROR');
    }
    var ret = bank ? bank.distribute(amount, referencearray) : false;
    amount = null;
    referencearray = null;
    return ret;
  }

  BankWithDistributionSetService.prototype.distribute = function (bankname, amount, referencearray) {
    return qlib.promise2decision(this.getOrCreateBank(bankname), distributor.bind(null, amount, referencearray));
  }
  
  return BankWithDistributionSetService;
}

module.exports = createBankWithDistributionSetService;

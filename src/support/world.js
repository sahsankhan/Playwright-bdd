const { World, setWorldConstructor } = require('@cucumber/cucumber');

class BddWorld extends World {
  constructor(options) {
    super(options);
  }
}

setWorldConstructor(BddWorld);

module.exports = { BddWorld };

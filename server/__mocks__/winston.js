jest.mock('winston', () => {
  const info = jest.fn();
  const createLogger = () => ({ info });
  return {
    createLogger,
  };
});

module.exports = require('winston');

var _ = require('./util');

module.exports = function(argv) {
  var imgInfo = require('./parse')(argv);

  require('./release')(imgInfo, argv)
    .then(function() {
      console.log('done!');
    })
    .catch(function(e) {
      console.log(e);
    });
};
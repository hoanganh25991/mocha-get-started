var util = require('util');


process.log = {
  status: false,
  content: ''
};

function ti(runner) {
  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
    passes++;
    process.log.content += util.format('\033[01;32mpass: %s\033[0m\n', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    process.log.content += util.format('\033[01;31mfail: %s\033[0m\n-- error: %s\n', test.fullTitle(), err.message);
  });

  runner.on('end', function(){
    process.log.content += util.format('\nend: \033[01;32m%d/%d\033[0m\n', passes , passes + failures);
    var isAllPassed = passes == (passes + failures);

    process.log.status = isAllPassed;

    console.log(process.log.content);
    process.exit(failures);
  });
}

module.exports = ti;
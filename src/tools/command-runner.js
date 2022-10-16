const { spawn }  = require('child_process');

module.exports = function run(cmd, args, cwd) {

    return spawn(cmd, args ?? [], { shell: true, cwd: cwd ?? "" });

}


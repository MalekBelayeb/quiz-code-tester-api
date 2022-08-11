import { spawn } from 'child_process';

export function run(cmd, args, cwd) {

    return spawn(cmd, args ?? [], { shell: true, cwd: cwd ?? "" });

}


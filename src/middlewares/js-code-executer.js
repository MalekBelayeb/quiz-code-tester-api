const run  = require('../tools/command-runner');

module.exports = (req, res, next) => {

    let attemptFiles = req.files?.attempt ?? [0]
    var processStatus = 'CODE_INCORRECT' | 'CODE_CORRECT' | 'REACHED_TIMEOUT'
    var message = ''

    var timeoutProcess = 2000

    if (attemptFiles.length > 0) {

        let child = run("node " + attemptFiles[0].path)

        child.stdout.on('data', data => {
            
            req.attemptFilePath = attemptFiles[0].path
            req.attemptFileName = attemptFiles[0].filename
            message = ''
            processStatus = 'CODE_CORRECT'
        })


        child.stderr.on('data', data => {

            let errMessageArr = data.toString('utf-8').split(/\n/)
            let errResult = []

            errMessageArr.forEach(element => {

                if (element.indexOf('file') == -1 && element.indexOf('at') == -1) {
                    errResult.push(element.replace(/\s+/, ""))
                }

            });
            message = errResult.join("\n")
            processStatus = 'CODE_INCORRECT'

        });

        //to prevent long execution code and infinite process  / eg: while(true) { }
        setTimeout(() => {

            message = "Long execution code timeout reached"
            processStatus = 'REACHED_TIMEOUT'

            child.kill();
        }, timeoutProcess);

        //on forced to terminate
        child.on('exit', () => {

            switch (processStatus) {
                case 'REACHED_TIMEOUT':
                    {
                        res.status(402).send({ message })
                    }
            }

        })

        child.on('close', (code) => {

            switch (processStatus) {
                case 'CODE_INCORRECT':
                    {

                        res.status(402).send({ message })

                    }
                case 'CODE_CORRECT':
                    {
                        next()
                    }
            }
        });

    } else {
        res.status(404).send({ message: "Error while building" })
    }


}


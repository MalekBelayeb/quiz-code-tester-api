import { run } from '../tools/commandRunner.mjs'

export default (req, res, next) => {

    let attemptFiles = req.files?.attempt ?? [0]

    if (attemptFiles.length > 0) {
        let child = run("node " + attemptFiles[0].path)

        child.stdout.on('data', data => {

            req.attemptFilePath = attemptFiles[0].path
            req.attemptFileName = attemptFiles[0].filename
            next()
        });

        child.stderr.on('data', data => {

            let errMessageArr = data.toString('utf-8').split(/\n/)
            let errResult = []

            errMessageArr.forEach(element => {

                if (element.indexOf('file') == -1 && element.indexOf('at') == -1) {
                    errResult.push(element.replace(/\s+/, ""))
                }

            });

            res.send({ message: errResult.join("\n") })

        });
    } else {
        res.status(404).send({ message: "Error while building" })
    }


}


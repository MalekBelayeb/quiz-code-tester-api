/**
 * This function interpret the test output to a clear and human readable object 
 * 
 * Initially this middleware take req.testResult as input and return req.attemptResult as output
 * 
 */

module.exports = (req, res, next) => {

    console.log("start code-interpreter")
    let testResult = req.testResult
    let testCasesResult = []
        
    let attemptResult = {}
    testResult.map((item) => {
        item.map((line) => {

            if (line.indexOf('●') != -1 || line.indexOf('√') != -1 || line.indexOf('Expected') != -1 || line.indexOf('Received') != -1 || line.indexOf('Tests') != -1 || line.indexOf('Time') != -1) {
                testCasesResult.push(line)
            }

        })

    })

    attemptResult.passedTestCases = testCasesResult.filter((item) => { return item.indexOf('√') != -1 }).length
    attemptResult.failedTestCases = testCasesResult.filter((item) => { return item.indexOf('●') != -1 }).length
    attemptResult.testCases = []

    testCasesResult.forEach((item, index) => {
            
        if (item.indexOf('√') != -1) {
            attemptResult.testCases.push({ description: item, passed: true })
        } else if (item.indexOf('●') != -1) {
            let failedTestObj = {}
            failedTestObj.description = item
            failedTestObj.passed = false
            let indexFailedTest = index
            if (testCasesResult[indexFailedTest + 1].indexOf('Expected') != -1 && testCasesResult[indexFailedTest + 2].indexOf('Received') != -1) {
                failedTestObj.expected = testCasesResult[indexFailedTest + 1]
                failedTestObj.received = testCasesResult[indexFailedTest + 2]
            }

            attemptResult.testCases.push(failedTestObj)
        }
    
    })

    req.attemptResult = attemptResult
    console.log("end code-interpreter")

   next()
        
}
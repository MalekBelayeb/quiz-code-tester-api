const Candidate = require('../models/candidate-model');
const jwt = require('jsonwebtoken');

const signUpCandidate = async (req, res) => {

    try {

        const existCandidate = await Candidate.findOne({ email: req.body.email })
        if (existCandidate) {
            res.status(404).send({ message: "Candidate already exist ." })

        } else {

            const candidate = new Candidate()
            candidate.email = req.body.email;
            candidate.password = req.body.password;
            let newCandidate = await candidate.save();

            res.status(200).send({ message: "new candidate created.", newCandidate })

        }


    } catch (err) {

        if (err) {

            if (err.name === 'ValidationError') {
                console.log(err)
                res.status(404).json({ message: Object.values(err.errors).map(val => val.message) })
            }

        } else {

            console.log(err)
            res.status(404).end()
        }

    }

}

const signInCandidate = async (req, res) => {

    try {

        let candidate = await Candidate.findOne({ email: req.body.email })

        if (candidate) {

            if (candidate.password === req.body.password) {

                const token = jwt.sign(
                    { iduser: candidate._id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "8h",
                    }

                );

                res.status(200).send({ access_token: token, candidate })

            } else {
                res.status(404).send({ message: "Wrong email or password please check your crendential" })
            }
        } else {
            res.status(404).send({ message: "Wrong email or password please check your crendential" })

        }

    } catch (err) {

        console.log(err)
        res.status(404).end()


    }

}

module.exports = { signUpCandidate, signInCandidate }

/**
   * This function to verify if the user has right privileges or not
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns
   */
  
 function acceptRole(role) {
    return (req, res, next) => {

        if (Array.isArray(role)) {
            if (role.includes(req.user.role)) {
                
                next()

            } else {

                return res.status(403).send({ success: false, message: 'Your role does not permit this operation' });

            }
        } else {

            return res.status(500).send({ success: false, message: 'Server error try later' });

        }

    }
}


module.exports = { acceptRole }
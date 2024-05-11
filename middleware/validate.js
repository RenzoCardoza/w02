// const validator = require('../utilities/validate')

// const saveChampion = (req, res, next) => {
//     const validationRule = {
//         champ_name: 'required|string',
//         champ_alias: 'required|string',
//         role: 'required|string',
//         difficulty: 'required|string',
//         lore: 'required|string'
//     }
//     validator(req.body, validationRule, {}, (err, status) => {
//         if (!status) {
//             res.status(412).send({
//                 success: false,
//                 message: 'Validation Failed',
//                 data: err
//             })
//         } else {
//             next()
//         }
//     })
// }

// module.exports = { saveChampion }
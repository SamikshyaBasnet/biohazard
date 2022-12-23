import * as Yup from 'yup'

const degreeValidate = Yup.number()
  .required()
  .positive('The value must be positive')
  .integer()
  .min(160, 'Please enter the value between 160 and 180')
  .max(180, 'Please enter the value between 160 and 180')

const requiredStringValidate = Yup.string().required(
  'This is a required field. Please fill it.',
)
const requiredNumberValidate = Yup.number()
  .min(1)
  .required('This is a required field. Please fill it.')

export const bioHazardValidation = Yup.object().shape({
  min_unit: degreeValidate,
  max_unit: degreeValidate,
  process: requiredStringValidate,
  interval: requiredStringValidate,
  duration: requiredNumberValidate,
})

export default bioHazardValidation

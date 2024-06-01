const { body, param } = require('express-validator')
const challenge_service = require('../../services/challenge')

const addChallengeValidation = () => {
	return [
		body('challengeName').notEmpty()
			.withMessage('Challenge name must not be empty')
			.isLength({ min: 2, max: 225 })
			.withMessage('Challenge name must be between 2 and 225 characters long'),
		body('challengeDescription').notEmpty().withMessage('Challenge Description must not be empty'),
		body('challengeDate').notEmpty()
			.withMessage('Challenge date must not be empty')
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
				'g'
			)
			.withMessage(
				'Invalid date and time format. Please use "DD/MM/YYYY HH:mm".'
			),
		body('challengeDuration').notEmpty().withMessage('Challenge duration must not be empty'),
		body('challengeRules').notEmpty().withMessage('Challenge rules must not be empty'),
	]
}

const deleteChallengeValidation = () => {
	return [
		param('id').custom(async id => {
			const exists = await challenge_service.getById(id)
			if (!exists) {
				throw new Error('Challenge not found')
			}
		}),
	]
}

const updateChallengeValidation = () => {
	return [
		param('id').custom(async id => {
			const exists = await challenge_service.getById(id)
			if (!exists) {
				throw new Error('Challenge was not found')
			}
		}),
		body('challengeName').notEmpty()
			.withMessage('Challenge name must not be empty')
			.isLength({ min: 2, max: 225 })
			.withMessage('Challenge name must be between 2 and 225 characters long'),
		body('challengeDescription').notEmpty().withMessage('Challenge Description must not be empty'),
		body('challengeDate').notEmpty()
			.withMessage('Challenge date must not be empty')
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
				'g'
			)
			.withMessage(
				'Invalid date and time format. Please use "DD/MM/YYYY HH:mm".'
			),
		body('challengeDuration').notEmpty().withMessage('Challenge duration must not be empty'),
		body('challengeRules').notEmpty().withMessage('Challenge rules must not be empty'),
	]
}

module.exports = {
	addChallengeValidation,
	updateChallengeValidation,
	deleteChallengeValidation,
}

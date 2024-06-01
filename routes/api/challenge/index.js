const express = require('express')
const { validationResult } = require('express-validator')
const {
	addChallengeValidation,
	updateChallengeValidation,
	deleteChallengeValidation,
} = require('../../../validators/challenge')

const router = express.Router()
const challenge_controller = require('../../../controllers/api/challenge')

router.get('/', (req, res) => {
	challenge_controller.getAll(req, res)
})

router.post('/', addChallengeValidation(), (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	challenge_controller.create(req, res)
})

router.put('/:id', updateChallengeValidation(), (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	challenge_controller.update(req, res)
})

router.delete('/:id', deleteChallengeValidation(), (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	challenge_controller.delete(req, res)
})

module.exports = router

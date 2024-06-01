const challenge_service = require('../../../services/challenge')

const challenge_controller = {
	getAll(req, res) {
		res.json(challenge_service.getAll())
	},
	create(req, res) {
		res.status(201).json(challenge_service.create(req, res))
	},
	update(req, res) {
		const challenge = challenge_service.update(req.params.id, req.body)

		if (challenge) {
			res.json(challenge)
		} else {
			res.status(404).send('Challenge not found')
		}
	},
	delete(req, res) {
		const challenge = challenge_service.getById(req.params.id)

		if (challenge) {
			challenge_service.delete(req.params.id)
			res.status(204).send('Challenge deleted successfully')
		} else {
			res.status(404).send('Challenge not found')
		}
	},
}

module.exports = challenge_controller

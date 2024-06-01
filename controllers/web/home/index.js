const challenge_service = require('../../../services/challenge')

const home_controller = {
	index: async (req, res) => {
		res.render('home')
	},
	add: async (req, res) => {
		res.render('home/add_update', { mode: 'Add' })
	},
	update: async (req, res) => {
		const challengeData = await challenge_service.getById(req.params.id)
		res.render('home/add_update', { mode: 'Update', challengeData: challengeData })
	},
}

module.exports = home_controller

const fs = require('fs')

const challenges = require(global.mock_db)

const challenge_service = {
	getAll() {
		return challenges
	},
	getById(id) {
		return challenges.find(t => t.id == id)
	},
	create(req, res) {
		let new_id = genRandId(4)

		const challenge = req.body

		const new_challenge = {
			id: new_id,
			challenge: challenge,
		}

		challenges.push(new_challenge)

		writeToFile(challenges)

		return new_challenge
	},
	update(id, updateData) {
		const challengeIndex = challenges.findIndex(t => t.id == id)

		if (challengeIndex === -1) {
			return null
		}

		challenges[challengeIndex].challenge = {
			...challenges[challengeIndex].challenge,
			...updateData,
		}

		writeToFile(challenges)

		return challenges[challengeIndex]
	},
	delete(id) {
		const index = challenges.findIndex(u => u.id == id)
		challenges.splice(index, 1)
		writeToFile(challenges)
	},
}

let writeToFile = async users => {
	await fs.writeFileSync(global.mock_db, JSON.stringify(users, null, 4), 'utf8')
}

let genRandId = count => {
	let result = ''
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for (let i = 0; i < count; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

module.exports = challenge_service

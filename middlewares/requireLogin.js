//sole purpose of this middleware is to check if the user is logged in
//before allowing a particular route handler to be executed
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}
	next();
};
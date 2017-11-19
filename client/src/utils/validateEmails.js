const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		//keep the emails which are invalid in the array
		.filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};

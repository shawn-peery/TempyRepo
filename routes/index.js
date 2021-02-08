var express = require("express");
var router = express.Router();

const users = [
	{
		firstName: "Shawn",
		lastName: "Whitaker",
		email: "shawn.w8465@gmail.com",
		password: "taco",
		confirmPassword: "taco",
	},
];
let id = 0;

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/registration", function (req, res, next) {
	res.render("registration", {
		registration: {},
	});
});

router.get("/forgot", function (req, res, next) {
	res.render("forgot", {
		passwordChange: {},
	});
});

router.get("/login", function (req, res, next) {
	res.render("login", {
		credentials: {},
	});
});

router.post("/api/users", function (req, res, next) {
	const body = req.body;

	if (body.newPswCfm) {
		// is a password reset request
		console.log("Password Reset Request");

		/* 
			We are assuming that in a production environment we have asked the user claiming to have this email
			to give us a one time pin we sent to their email. They have successfully put in the right pin,
			and now we are handling password change with the assumption that they have authenticated themselves
			to being this user.

			The reason we are not implementing an actual email verification process is because the time to create
			a functioning implementation is unknown and this project is meant to be a sort of 'demo' anyways.

			If this code eventually does go to production, one approach is to simply look for a NPM package that handles
			the email verifcation one time pin for us. All we need to do is initiate the package to send the pin to the users
			email, and once the pin has been entered we verify it with the package as well. After this, we can assume
			the person at the computer is actually the user they claim to be.
		*/

		const user = users.find((u) => u.email === body.email);

		if (user) {
			res.render("forgot", {
				passwordChange: {
					error: `Unable to find user with email: ${body.email}`,
				},
			});
			return;
		}

		/* 
			We will handle this matching validation on back-end only for simplicity sake for now. However,
			like the comment above, in a production environment, we want to make sure the front-end has the same validation.
			This avoids unnecessary sending of form information to the back-end which results in a response saying this is invalid.
			Alternatively, with front-end validation, the form won't be sent at all unless the two fields are matching.
		*/
		if (body.newPsw !== body.newPswCfm) {
			res.render("forgot", {
				passwordChange: {
					error: `Unable to find user with email: ${body.email}`,
				},
			});
			return;
		}

		// This updates the user inside of the array
		user.password = body.newPsw;

		res.render("forgot", {
			passwordChange: {
				success: "You have successfully reset your password!",
			},
		});
	} else if (body.firstName) {
		// is a register request
		users.push(body);
		id++;

		res.render("registration", {
			registration: {
				success: "You have successfully registered!",
			},
		});
		console.log(users);
		console.log("Register Request");
	} else if (body.email) {
		// Login Request

		/* 
			Also, in a production environment, the users' passwords would be stored inside of a databased as 
			as an encrypted string.
		*/

		console.log("Login Request");
		const user = users.find(
			(u) => u.email === body.email && u.password === body.password
		);

		if (!user) {
			res.render("login", {
				credentials: {
					error: "Your credentials are incorrect!",
				},
			});
			return;
		}

		res.render("login", {
			credentials: {
				success: "You have successfully logged in!",
			},
		});
	}
});

module.exports = router;

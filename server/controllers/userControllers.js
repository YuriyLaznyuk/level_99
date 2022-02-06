const User = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({message: 'incorrect request', errors: errors.array()});
		}
		const {email, password} = req.body;
		const isExist = await User.findOne({email});
		if (isExist) {
			return res.status(400).json({message: `this email: ${email} is use `});
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const newUser = await User.create({...req.body, password: hashPassword});
		res.status(201).json({user: newUser, message: 'user create'});
	} catch (e) {
		res.status(400).json({
			message: e.message,
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const {password, email} = req.body;
		const user = await User.findOne({email});
		if (!user) {
			return res.status(400).json({message: 'user is not found'});
		}
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({message: 'invalid password'});
		}
		const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
			expiresIn: '10h',
		});
		res.status(201).json({
			message: 'success',
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		});
	} catch (e) {
		res.status(400).json({
			message: 'fail',
			error: e.message,
		});
	}
};
exports.authUser = async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.id});
		const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
			expiresIn: '10h',
		});
		res.status(201).json({
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		});
	} catch (e) {
		res.status(400).json({
			message: 'fail',
			error: e.message,
		});
	}
};

const express = require('express');
const fs = require('fs');
const prisma = require('../lib/prisma');
const router = express.Router();
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken')
const Joi = require('joi')
// authentication
// registration

const registerSchema = Joi.object({
	name:Joi.string().required(),
	email:Joi.string().required(),
	password: Joi.string().required(),
})
const validate = (req,res,next)=>{
	const {error} = registerSchema.validate(req.body,{
		abortEarly: false
	})

	if(error){
		return next(new AppError(error.details[0].message, 400 , error.details))
	}
}

router.post('/',validate, async (req, res,next)=>{
	try{
		const {name,email,password} = req.body;
	const hashedPassword = await bcrypt.hash(password,10)
	console.log("🚀 ~ router.post ~ hashedPassword:", hashedPassword)
	const user = await prisma.user.create(
		{
			data: {name,email,password: hashedPassword}
		}
	)
	user.password = undefined;
	res.send(user)
	}catch(err){
		next(err)
	}
})

// login
router.post('/login',async(req,res,next)=>{
	try{
		// email, password
		//1. email -> exists or not: user
		const {email, password} = req.body;
		const user = await prisma.user.findUnique({
			where: {email: email}
		})
		if(!user) throw new AppError('invalid credentials', 400)
		console.log("🚀 ~ router.post ~ user:", user)
		//2. password -> user.passworc
		const passwordCorrect = await bcrypt.compare(password, user.password);
		if(!passwordCorrect) throw new AppError('invalid credentials', 400)
		//3. success
	const token = jwt.sign({email: user.email},process.env.JWT_SECRET);
		res.send({token})
	}catch(err){
		next(err)
	}
})







// users
router.get('/', async (req, res) => {
	const users = await prisma.user.findMany({
		include:{
			posts:{
				select:{
					title: true
				}
			}
		}
	}) 
	res.send(users)
})


router.get('/:id',()=>{})

router.delete('//:id',(req,res)=>{
	console.log("params",req.params)
	res.send('deleted')
})
router.put('/:id',()=>{})


module.exports = router;
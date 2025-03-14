const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const router = express.Router();

const verifyUser = async (req,res,next)=>{
	try{
		// receive token and extract it
	const token = req.headers.authorization.split(' ')[1]
		// verify the token using jwt
	const payload = jwt.verify(token,process.env.JWT_SECRET)
		// get the user from the database
	const user  = await prisma.user.findUnique({
		where : {email: payload.email}
	})
	req.user = user
	// append the user to the request object
	next()
	}catch(err){
		next(err)
	}
}

//posts
router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({
		include:{
			author:{
				select:{
					id: true,
					name: true,
					email: true
				}
			}
		}
	})
	res.send(posts)
})
router.post('/',verifyUser, async (req, res)=>{
	const {title,content} = req.body;
	const post = await prisma.post.create({
		data:{
			title,
			content,
			authorId: req.user.id
		}
	})
	res.send(post)
})

router.get('/:id',()=>{})

router.delete('/:id',(req,res)=>{
	console.log("params",req.params)
	res.send('deleted')
})
router.put('/:id',()=>{})

module.exports = router;

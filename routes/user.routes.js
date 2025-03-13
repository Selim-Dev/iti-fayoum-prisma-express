const express = require('express');
const fs = require('fs');
const prisma = require('../lib/prisma');
const router = express.Router();


// users
router.get('/', (req, res) => {
	const data = fs.readFileSync('db.json',{encoding:'utf-8'})
	res.send(JSON.parse(data))
})
router.post('/',async (req, res)=>{
	const {name,email,password} = req.body;
	const user = await prisma.user.create(
		{
			data: {name,email,password}
		}
	)
	res.send(user)
	// get user data from body
	// add the data of user into the  database using prisma
	// return user
})

router.get('/:id',()=>{})

router.delete('//:id',(req,res)=>{
	console.log("params",req.params)
	res.send('deleted')
})
router.put('/:id',()=>{})


module.exports = router;
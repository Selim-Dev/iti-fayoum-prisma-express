const express = require('express');

const router = express.Router();


//posts
router.get('/posts', (req, res) => {
  const data = fs.readFileSync('db.json',{encoding:'utf-8'})
	res.send(JSON.parse(data))
})
router.post('/posts',(req, res)=>{
	const dataString = fs.readFileSync('db.json',{encoding:'utf-8'});
	const data = JSON.parse(dataString)
	const newTodo = req.body;
	data.push(newTodo)
	console.log("🚀 ~ router.post ~ data:", data)
	fs.writeFileSync('./db.json',JSON.stringify(data,null,2))
	res.send('success')
})

router.get('posts/:id',()=>{})

router.delete('/posts/:id',(req,res)=>{
	console.log("params",req.params)
	res.send('deleted')
})
router.put('posts/:id',()=>{})

module.exports = router;

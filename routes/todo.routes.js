const express = require('express');
const fs = require('fs');
const path = require('path')
const router = express.Router();

router.get('/', (req, res) => {
	const data = fs.readFileSync('db.json',{encoding:'utf-8'})
	res.send(JSON.parse(data))
})
router.post('/',(req, res)=>{
	const filePath  = path.join(__dirname,'hamada.json')
	const dataString = fs.readFileSync(filePath,{encoding:'utf-8'});
	const data = JSON.parse(dataString)
	const newTodo = req.body;
	console.log("🚀 ~ router.post ~ newTodo:", newTodo)
	data.push(newTodo)
	console.log("🚀 ~ router.post ~ data:", data)
	fs.writeFileSync(filePath,JSON.stringify(data,null,2))
	res.send('success')
})

router.get('/:id',()=>{})

router.delete('/:id',(req,res)=>{
	console.log("params",req.params)
	res.send('deleted')
})
router.put('/:id',()=>{})





module.exports = router;

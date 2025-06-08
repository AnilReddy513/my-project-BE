const express = require('express');
const cors = require('cors')
const fs = require('fs');
const app = express();
app.use(cors())
app.use(express.json());

const readData = () =>{
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
}


const writeData = (data) =>{
    fs.writeFileSync('data.json',JSON.stringify(data));
}

app.get('/items', (req,res)=>{
    const data = readData();
res.json(data);
})



app.post('/items', (req,res)=>{
    const data = readData();

    const newId = data.length ? Math.max(...data.map(item =>item.id))+1 : 1;  // check for newid number if array has [..1,2,3,4, 5] then newid will be 6
    const newItem = {
        id:newId,
        name:req.body.name
    }

data.push(newItem)
writeData(data)
res.status(201).json(newItem);
})



app.put('/items/:id', (req,res)=>{
    const data = readData();
    const itemId = parseInt(req.params.id);
    const index = data.findIndex(item=>item.id === itemId);
    if(index !== -1){
    data[index]={...data[index], ...req.body};
    writeData(data);
    res.json(data[index]);
    }
    else{
        return res.status(404).json({messagre:'not found'});
    }
   
})



app.delete('/items/:id', (req,res)=>{
  let data = readData();
  const id = parseInt(req.params.id);
 const index = data.findIndex(item =>item.id === id);
 if(index !== -1){
    data.splice(index,1)
    writeData(data);
    res.status(200).json({message:"item deleted"})
res.json(data);
 }
 else{
    res.status(404).json({message:"item not found"})
 }
})

app.listen(3000, ()=>{
    console.log("server running at 3000")
})
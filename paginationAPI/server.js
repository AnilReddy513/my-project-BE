const express= require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());



// dynamic data pages

const total_record = 49;
const all_items = Array.from({length: total_record}, (value,i)=>{
return{
    id:i+1,
    name:`Record${i+1}`
}
})

app.get('/', (req,res)=>{
    res.send("api is running")
});
// app.post('/pagenation', async(req,res)=>{
//     const {pageNo=1, pageSize=10} = req.body;
//     const totalPages = Math.ceil(total_record/pageSize);

//     //calmps occurs
//     const safePage = Math.min(Math.max(pageNo,1), totalPages);
//     const start = ( safePage - 1) * pageSize;
//     const data = all_items.slice(start, start + totalPages);
//     res.json({
//         data, totalPages})

// })

app.post('/pagination', async (req,res)=>{
    const { pageNo = 1, pageSize = 10 }= req.body;

    if( !pageNo || !pageSize){
     return  res.status(400).json({message:"error"})
    }

    const startIndex = (pageNo -  1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = all_items.slice(startIndex,endIndex);
    const totalPages =  Math.ceil(total_record/ pageSize)
   // res.status(201).json({message:"success"});
    res.json({
        data: paginatedData,
        totalPages: totalPages
    });
});


app.listen(1000, ()=>{
console.log("1000 api stared")
});
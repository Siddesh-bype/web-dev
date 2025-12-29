const fs=require('fs');
fs.writeFile('message.txt','Hello from Native Modules!', (err)=>{
    if(err) throw err;
});
console.log("File created: message.txt");

fs.readFile('message.txt', 'utf8',(err, data) => {
  if (err) throw err;
  console.log(data);
}); 
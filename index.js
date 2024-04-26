
const express = require('express');
const { readFile }  = require('fs/promises');

const app = express();
const PORT = 3000;

app.get('/read-content', async (req, res) => {
  try {
    const data = await readFile('content.txt', 'utf8');
	console.log('from processid:',process.pid);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api-slow', (req,res) => {
	console.time('SLOWAPI');
	try {
		
		const baseNumber = 7;
	
		let result = 0;
	
		for(let i= Math.pow(baseNumber,7); i>=0;i--){
			result += Math.atan(i) * Math.tan(i);
		}
		console.log('from processid:',process.pid);
		console.log(`Result is ${result}`);
		res.send({data: {
			message: "result calculated",
			result: result
		}});
		
	} catch (err) {
		res.status(500).send('Internal Server Error');
	} finally {
		console.timeEnd('SLOWAPI');
	}
})

app.listen(PORT, () => {
  console.log(`App (PID: ${process.pid}) is listening on port ${PORT}`);
});


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const cluster = require('cluster');
// const express = require('express');

// const total_cpus = require('os').availableParallelism();

// if(cluster.isMaster){
//     console.log('master cluster');

//     for(let i=0;i<total_cpus;i++){
//         console.log(`cpu number ${i}`);
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker process: "${process.pid}" died`);

// 		cluster.fork(); // replacement for the dead worker
//     });
// } else {
// 	const app = express();

//     console.log('worker cluster');
//     console.log(`Started Worker cluster process "${process.pid}"`);

//     const PORT = 8002;

//     app.get('/', (req, res) => { 
// 		setTimeout(() => res.send({data: {message: `Server is running. Response from process: ${process.pid}`}}), 5000);
// 		console.log(`get request "/" process: ${process.pid}`);
//     })

//     app.listen(PORT, () =>{
//         console.log(`Server is running at "${PORT}"`);
//     })
// }
// // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
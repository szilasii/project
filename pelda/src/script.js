async function getData(url="") {
        const response = await fetch(url, {
             method: "GET", // POST, PUT, DELETE ...       
            headers: {
             "Content-Type" : "application/json",
            },    
        })
        return response.json();   
} 

async function postData(url="", data = {}) {
    const response = await fetch(url, {
         method: "POST", // POST, PUT, DELETE ...       
        headers: {
         "Content-Type" : "application/json",
        }, 
        body: JSON.stringify(data),   
    })
    return response;   
} 


getData("http://localhost:8000/getdata").then((data) => {
    console.log(data);
});






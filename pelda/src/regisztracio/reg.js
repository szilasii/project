
regDataSave = (data) => {
    postData("http://localhost:8000/reg",data).then((response) => {
        if (response.status == 404) throw error
    return response.json();
        }).then((data) => {
            console.log(data);
           
        }).catch((error) => {
            console.log(error);
              alert("hiba");  
          });
}
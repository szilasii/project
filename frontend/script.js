const obj = { 
    vez_nev:"maci",
    ker_nev: "laci",
    cim:"Erdő",
    kiir() {
        console.log(this.vez_nev);  
    },
    vezetkereszt() {
        return this.vez_nev + " " + this.ker_nev;
    }
};


const tomb = [];
const i=3;
tomb[i] =15; 

const objnull = {} ;

const objnull2 = {__proto__:null} 

obj.vez_nev ="MACI";
obj.kiir();

console.log(`Ez egy proto obj: ${obj.ker_nev}`);

console.log(obj.vezetkereszt())
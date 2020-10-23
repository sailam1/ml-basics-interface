var content=[
    "hey",
    "hey2",
    "hey3",
    "hey4"
]
var len=content.length;
var i=0;
addShower()

function addShower(){
    document.getElementById("contentChanger").innerHTML=content[i];
    
    if(i>=len){
        i=0;
    }
    setTimeout(addShower,4000);
    i++;
}




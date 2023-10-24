var bookmarkerInfo={
    siteName:document.getElementById("sitename"),
    siteUrl:document.getElementById("siteurl")
};
var wrongEntry =document.getElementById("wrong-entry");
var userRules = document.getElementById("rules")
var bookmarkercontainer=[];


bookmarkerInfo.siteName.addEventListener("input", function(){
    if(this.value.length<=2){
    this.classList.add("notvalid");
    this.classList.remove("valid")}
    if (this.value.length>2){
        this.classList.replace("notvalid","valid")
    }
    
    });


bookmarkerInfo.siteUrl.addEventListener("input",function () {
    var regex = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
    if(regex.test(this.value) == false){
        this.classList.add("notvalid");
        this.classList.remove("valid")}
        
    if (regex.test(this.value) == true){
          this.classList.replace("notvalid","valid")}
})
function notValid(){
    
    wrongEntry.style.display="block";

}
if(localStorage.getItem("bookmarker") != null){
    bookmarkercontainer = JSON.parse(localStorage.getItem("bookmarker"))
    displayBookmarker(bookmarkercontainer)
    
}


function addBookmarker(){
    var bookmarker = {
        name:bookmarkerInfo.siteName.value,
        url:bookmarkerInfo.siteUrl.value
    }

    var isDuplicate = bookmarkercontainer.some(function(existingBookmarker) {
        return existingBookmarker.name === bookmarker.name || existingBookmarker.url === bookmarker.url;
        });
        
        if (isDuplicate) {
        notValid();
        return;
        }

    if(bookmarkerInfo.siteName.classList.contains("valid") && bookmarkerInfo.siteUrl.classList.contains("valid")){

    bookmarkercontainer.push(bookmarker);
    localStorage.setItem("bookmarker", JSON.stringify(bookmarkercontainer));
    displayBookmarker(bookmarkercontainer)
    bookmarkerInfo.siteName.classList.remove("valid")
    bookmarkerInfo.siteUrl.classList.remove("valid")


    clearForm()}
    else {
        notValid()

    }
}

document.getElementById("wrong-entry").addEventListener("click",function (){
    
    wrongEntry.style.display="none";}
 );
 /*
document.addEventListener("click", function(event){
    var target= event.target;
    if(target !== userRules && !userRules.contains(target)){
        wrongEntry.style.display="none"
    }
})
*/
function displayBookmarker(bookmarkercontainer) {
    var cartona = "";
    for (var i=0; i<bookmarkercontainer.length; i++){
        cartona+= `<tr>
        <td> ${i + 1}</td>
        <td> ${ bookmarkercontainer[i].name}</td>
        
        <td><button class="btn visit text-white" onclick="goUrl('https://${bookmarkercontainer[i].url}')"><i class="fa-solid fa-eye me-2"></i>visit</button></td>
        <td><button class="btn btn-danger text-white" onclick="deleteBookmarker(${i})">delete</button></td>
        </tr>`
    };
    document.getElementById("tablebody").innerHTML=cartona

  }
  function goUrl(url) {
    window.open(url, "_blank");
    };

  function clearForm(){
    bookmarkerInfo.siteName.value ="";
    bookmarkerInfo.siteUrl.value ="";

    
};

function deleteBookmarker(bookmarkerIndex){
    bookmarkercontainer.splice(bookmarkerIndex,1)
    localStorage.setItem("bookmarker", JSON.stringify(bookmarkercontainer));
    displayBookmarker(bookmarkercontainer)
 }



let id = document.currentScript.getAttribute("CLIENTID")
var ele = document.createElement("app-chatbot");
ele.setAttribute("secret",id)
document.body.append(ele);

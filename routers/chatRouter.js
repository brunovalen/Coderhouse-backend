const ApiChat = require("../api/apiChat");
const apiChat= new ApiChat
const server = require("express").Router();

server.get("/", async(req, res) => {
  let data =  await apiChat.getPorcentage()
  if (req.session.user) {
    return res.render("chat.hbs",{data:data});
  } else return res.redirect("login");
});

module.exports = server;

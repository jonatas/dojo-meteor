Todos = new Meteor.Collection("todos");
Users = new Meteor.Collection("users");
if (Meteor.isClient) {
  Meteor.autorun(function(){
    Meteor.subscribe("todos");
    Meteor.subscribe("users");
  });
  Template.todos.todos = function(){
    return Todos.find();
  }
  Template.users.todos = function(){
    return Todos.find({user: this.id});
  }
  Template.users.users =
    Template.select_user.users = function(){
    return Users.find();
  }
  Template.select_user.events({
    'change select' : function(e){
      Todos.update(this._id, {$set: {user: e.target.value}});
    }
  });
  Template.users.events({
    'submit form' : function (e) {
      Users.insert({name:$("input.name").val()});
      $("input.name").val("");
      return false;
    }
  });
  Template.todos.events({
    'submit form' : function (e) {
      Todos.insert({todo:$("input.todo").val()});
      $("input.todo").val("");
      return false;
    },
    'click .icon-remove': function(){
      Todos.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("todos", function(){ return Todos.find();});
    Meteor.publish("users", function(){return Users.find();});
  });
}

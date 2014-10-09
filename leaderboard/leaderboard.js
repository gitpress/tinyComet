PlayersList = new Meteor.Collection('players');

if (Meteor.isClient) {
    Template.leaderboard.player = function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    };
    
    Template.leaderboard.bloke = function(){
      var hatrick = "3";
      return hatrick + " that's three!";
    };
    
    Template.leaderboard.selectedClass = function(){
      var selectedPlayer = Session.get('selectedPlayer');
      var playerId = this._id;
      if(selectedPlayer === playerId){
          return 'selected';
        }
    };
    
    Template.leaderboard.showSelectedPlayer = function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    };
    
    Template.leaderboard.events({
    'click li.player': function(){
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
        var selectedPlayer = Session.get('selectedPlayer');
        console.log(selectedPlayer);
      },
      
    'click #increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(
          {_id: selectedPlayer},
          {$inc: {score: 5}}
          );
      }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

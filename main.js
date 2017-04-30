//if player 1 and 2 are the same and win - loop until not the same
//only store final winner for winning rate - 1 out of 3 will win no matter how many rounds played
//enable/disable player 2, if disabled, diff function
//count how many times each player has played, and how many times each have won


$(document).ready(function(){

  var p1Stats = { pName: 'Player1', currChoice: null, gameCount:0, winCount:0, winRate:0};
  var p2Stats = { pName: 'Player2', currChoice: null, gameCount:0, winCount:0, winRate:0};
  var compStats = { pName: 'Computer', currChoice: null, gameCount:0, winCount:0, winRate:0};


// record player choices
  $('button').click( function(){
    var choice = $(this).html();
    var playerBtn = $(this).attr('class');
    if(playerBtn == 'p1Btn') {
      p1Stats['currChoice'] = choice;
      $('#player1Choice').html(' '+p1Stats['currChoice']);
      // if the other btn has no new choice made, clear previous choice display
      if (p2Stats['currChoice']== null){
          $('#player2Choice').html('');
      }
      //clear the computer choice field from last round
      $('#computerChoice').html('');
    } else if (playerBtn == 'p2Btn') {
      p2Stats['currChoice'] = choice;
      $('#player2Choice').html(' '+p2Stats['currChoice']);
      if (p1Stats['currChoice']== null){
          $('#player1Choice').html('');
      }
      $('#computerChoice').html('');
    }
  });
  // // how to clear previous game's choices at the beginning of a new round?

  // computer choose
  function computerChoose(){
    var choiceArr = ['Rock','Paper','Scissors'];
    var computerChoiceId = Math.floor(Math.random()*3)
    compStats['currChoice'] = choiceArr[computerChoiceId];
    compStats['gameCount']++;
    $('#computerChoice').html(' '+compStats['currChoice']);

  };

// play the game

  $('#startGame').click(function(){
    var finalWinner;
    var winner;
    if(!p1Stats['currChoice'] && !p2Stats['currChoice']){
        $('#announcement').val('Players Please Choose');
    } else if (!p1Stats['currChoice']) {
        p2Stats['gameCount']++;
        computerChoose();
        winner = basicWin(p2Stats['currChoice'],compStats['currChoice']);
        if (winner==='P1'){
            finalWinner = p2Stats['pName'];
            p2Stats['winCount']++;
        } else if (winner==='P2') {
            finalWinner = compStats['pName'];
            compStats['winCount']++;
        } else {
            finalWinner = 'None';
        }
    } else if (!p2Stats['currChoice']) {
        p1Stats['gameCount']++;
        computerChoose();
        winner=basicWin(p1Stats['currChoice'],compStats['currChoice']);
        if (winner==='P1') {
            finalWinner = p1Stats['pName'];
            p1Stats['winCount']++;
        } else if (winner==='P2'){
            finalWinner = compStats['pName'];
            compStats['winCount']++;
        } else {
            finalWinner = 'None';
        }
    } else {
        p1Stats['gameCount']++;
        p2Stats['gameCount']++;
        computerChoose();
        if (p1Stats['currChoice'] !== p2Stats['currChoice'] && p1Stats['currChoice'] !== compStats['currChoice'] && p2Stats['currChoice'] !==compStats['currChoice']){
            finalWinner = 'None';
        } else if (p1Stats['currChoice'] === p2Stats['currChoice'] && p1Stats['currChoice'] === compStats['currChoice']) {
            finalWinner = 'None';
        } else {
            finalWinner = multiPlayer(p1Stats['currChoice'],p2Stats['currChoice'],compStats['currChoice']);

        }
    }
    // consider if player 1 played, then player2  want to join, player 1's value need to be wiped away first
    if (finalWinner==='None'){
        $('#announcement').val('Nobody has won this round')
    } else {
        $('#announcement').val('Winner\(s\) of this round: '+finalWinner);
    }
    cleanCurrChoice();
    loadWinStats();
    console.log(finalWinner);

  });

// load win count and win rate results
  function loadWinStats() {
    $('#p1WinCount').html(' '+p1Stats['winCount']);
    $('#p2WinCount').html(' '+p2Stats['winCount']);
    $('#compWinCount').html(' '+compStats['winCount']);
    p1Stats['winRate'] = Math.round((p1Stats['winCount']/p1Stats['gameCount'])*10000)/100;
    p2Stats['winRate'] = Math.round((p2Stats['winCount']/p2Stats['gameCount'])*10000)/100;
    compStats['winRate'] = Math.round((compStats['winCount']/compStats['gameCount'])*10000)/100;
    $('#p1WinRate').html(' '+p1Stats['winRate']+'%');
    $('#p2WinRate').html(' '+p2Stats['winRate']+'%');
    $('#compWinRate').html(' '+compStats['winRate']+'%');
  }

// clean current choice after one round

  function cleanCurrChoice() {
    p1Stats['currChoice'] = null;
    p2Stats['currChoice'] = null;
    compStats['currChoice'] = null;
  }


  //clear old data for new game
  $('#newGame').click(function(){
    $('span').html('');
    $('#announcement').val('');
    p1Stats = { pName: 'Player1', currChoice: null, gameCount:0, winCount:0, winRate:0};
    p2Stats = { pName: 'Player2', currChoice: null, gameCount:0, winCount:0, winRate:0};
    compStats = { pName: 'Computer', currChoice: null, gameCount:0, winCount:0, winRate:0};
  });




  // decide who wins in a 3 player game

  function multiPlayer(player1Choice,player2Choice,computerChoice) {
    var firstWinner;
    var secondWinner;
    firstWinner= basicWin(player1Choice,player2Choice);
    if (firstWinner==='P1'){
        secondWinner= basicWin(player1Choice,computerChoice);
        if (secondWinner ==='P1'){
            secondWinner = p1Stats['pName'];
            p1Stats['winCount']++;
        } else if(secondWinner ==='P2'){
            secondWinner = compStats['pName'];
            compStats['winCount']++;
        } else {
            secondWinner = p1Stats['pName'] +' and '+compStats['pName'];
            p1Stats['winCount']++;
            compStats['winCount']++;
        }
    } else if (firstWinner==='P2') {
        secondWinner=basicWin(player2Choice,computerChoice);
        if (secondWinner==='P1'){
            secondWinner = p2Stats['pName'];
            p2Stats['winCount']++;
        } else if (secondWinner==='P2') {
            secondWinner =compStats['pName'];
            compStats['winCount']++;
        } else{
            secondWinner=p2Stats['pName'] +' and '+compStats['pName'];
            p2Stats['winCount']++;
            compStats['winCount']++;
        }
    } else {
        secondWinner= basicWin(player1Choice,computerChoice);
        if (secondWinner ==='P1') {
            secondWinner = p1Stats['pName'] +' and '+p2Stats['pName'];
            p1Stats['winCount']++;
            p2Stats['winCount']++;
        } else {
            secondWinner =compStats['pName'];
            compStats['winCount']++;
        }
    }
    return secondWinner;
    console.log(firstWinner);
    console.log(secondWinner);

  }




  function basicWin(p1, p2) {
    var winner;
    if (p1==='Rock' && p2 ==='Paper') {
        winner="P2";
    } else if (p1==='Rock' && p2 ==='Scissors') {
        winner="P1";
    } else if (p1==='Paper' && p2 ==='Scissors') {
        winner="P2";
    } else if (p1==='Scissors' && p2 ==='Rock') {
        winner="P2";
    } else if (p1==='Paper' && p2 ==='Rock') {
        winner="P1";
    } else if (p1==='Scissors' && p2 ==='Paper') {
        winner="P1";
    } else if (p1 === p2) {
        winner="Both";
    }
    return winner;
  }
});


$(document).ready(function(){

  var player1Choice;
  var player2Choice;
  var computerChoice;


  //player 1 choose
  $('#rock1').click(function(){
    player1Choice = 'Rock';
    $('#player1Choice').html(' '+player1Choice);
  });

  $('#paper1').click(function(){
    player1Choice = 'Paper';
    $('#player1Choice').html(' '+player1Choice);
  });

  $('#scissors1').click(function(){
    player1Choice = 'Scissors';
    $('#player1Choice').html(' '+player1Choice);
  });

  //player 2 choose
  $('#rock2').click(function(){
    player2Choice = 'Rock';
    $('#player2Choice').html(' '+player2Choice);
    computerChoose();

  });

  $('#paper2').click(function(){
    player2Choice = 'Paper';
    $('#player2Choice').html(' '+player2Choice);
    computerChoose();

  });

  $('#scissors2').click(function(){
    player2Choice = 'Scissors';
    $('#player2Choice').html(' '+player2Choice);
    computerChoose();

  });

  // computer choose
  function computerChoose(){
    var choiceArr = ['Rock','Paper','Scissors'];
    var computerChoiceId = Math.floor(Math.random()*3)
    computerChoice = choiceArr[computerChoiceId];
    $('#computerChoice').html(' '+computerChoice);
    firstRound(player1Choice,player2Choice,computerChoice);
  };

  // decide who wins

  function firstRound(player1Choice,player2Choice,computerChoice) {
    var firstWinner= basicWin(player1Choice,player2Choice);
    var secondWinner;
    if (firstWinner==='P1'){
      secondWinner= basicWin(player1Choice,computerChoice);
      if(secondWinner ==='P2'){
        secondWinner = 'Computer';
      }
    } else if (firstWinner==='P2') {
      secondWinner=basicWin(player2Choice,computerChoice);
        if (secondWinner==='P1'){
          secondWinner ='P2';
        } else if (secondWinner==='P2') {
          secondWinner ='Computer';
        } else{
          secondWinner='Both';
        }
    }

    console.log(firstWinner);
    console.log(secondWinner);

  }




  function basicWin(p1, p2) {
    var winner;
    if (p1==='Rock' && p2 ==='Paper') {
      winner="P2";
    } else if (p1==='Rock' && p2 ==='Scissors') {
      winner="P1";
    } else if (p1 === p2) {
        winner="Both";
    } else if (p1==='Paper' && p2 ==='Scissors') {
      winner="P2";
    } else if (p1==='Scissors' && p2 ==='Rock') {
      winner="P2";
    } else if (p1==='Paper' && p2 ==='Rock') {
      winner="P1";
    } else if (p1==='Scissors' && p2 ==='Paper') {
      winner="P1";
    }

    return winner;
  }
});

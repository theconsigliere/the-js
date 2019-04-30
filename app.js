var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activeplayer = 0;

//always displays a number between 1 - 6
dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);

//type coericion will change the id tag between 1 and 0 depending on the activePlayer
document.querySelector("#current-" + activeplayer).textContent = dice;
//changes the elements textContent so the text content of #current- is now the value of var dice

// Assignment code here

// These variables are what our lil program or whatever are going to pull from in order to create the password.
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
var lowerCase = "abcdefghijklmnopqrstuvwxyz".split("")
var specialChar = "!@#$%&*+_-)(^<>?|;:'{}~".split("")
var numbers = "0123456789".split("")

// This function hill come in handy later. This lets us generate a prompt that allows us to choos the length of our password.
function getOptions() {
  var length = parseInt(prompt("How many characters would you like your pasword to contain?"))
  //If the response to the prompt, Number.isNaN will verify that a number has been returned. If no then we get a response in the alert container.
  if(Number.isNaN(length)) {
    alert("Password length must be provided as a number.")
    return null
  }
  //this verifies the number input is between the given value.
  if(length<8 || length>128) {
    alert("Password must be between 8 and 128")
    return null
  }

  //These vars serve the passwordOptions. When they are called upon in the line of duty, they serve to notify you that you must get with this or get with that.
  var hasUpperCase = confirm("click okay to include uppercase letters")
  var hasLowerCase = confirm("click okay to confirm uppercase")
  var hasSpecialChar = confirm('click okay to be/include the special characters')
  var hasNumbers = confirm("click okay to include numbers")
  //this if is used to ensure that users select a character type for their password.
  if(
    hasUpperCase === false && 
    hasLowerCase === false &&
    hasSpecialChar === false &&
    hasNumbers === false 
  ){
    alert("must select at least on character type")
    return null
  }
  // Returns with true/false values in order to gather what the heck the user wants.
  var passwordOptions = {
    length: length,
    hasUpperCase: hasUpperCase,
    hasLowerCase: hasLowerCase,
    hasSpecialChar: hasSpecialChar,
    hasNumbers: hasNumbers
  }

  return passwordOptions
}
//Heres where the randomness comes in. Someone had to do it right?
function getRandom(arr){
  var randomI = Math.floor(Math.random()*arr.length)
  var randomEl = arr[randomI]
  return randomEl
}
// this is the function that assembles the password from selected character types.
function generatePassword() {
  var options = getOptions()
  var result = []
  var possibleChars = []
  var guaranteedChars = []
  //if an option returns false it won't use that option
  if(!options)
  return null
  //The following four if statements are whats used to take all your possible characters and concatinatorize them. The guaranteedChar is to ensure that you end up with the right character because of gross math stuff.
  if(options.hasUpperCase) {
    possibleChars = possibleChars.concat(upperCase)
    guaranteedChars.push(getRandom(upperCase))
  }

  if(options.hasLowerCase) {
    possibleChars = possibleChars.concat(lowerCase)
    guaranteedChars.push(getRandom(lowerCase))
  }

  if(options.hasSpecialChar) {
    possibleChars = possibleChars.concat(specialChar)
    guaranteedChars.push(getRandom(specialChar))
  }

  if(options.hasNumbers) {
    possibleChars = possibleChars.concat(numbers)
    guaranteedChars.push(getRandom(numbers))
  }
  //these for dealios start at the first character and continue running their random chaos math to return your character from the array and continue until it reaches the end of your password.
  for(var i = 0; i < options.length; i++) {
    var possibleChar = getRandom(possibleChars)
    result.push(possibleChar)
  }

  for(var i = 0; i < guaranteedChars.length; i++) {
    result[i]=guaranteedChars[i]
  }
  //the join will assemble your results into one string :)
  return result.join("")
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

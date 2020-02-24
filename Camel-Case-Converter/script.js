document.getElementById("convertButton").addEventListener('click', ConvertCamelCase);

function ConvertCamelCase() 
{
  let camelCase = document.getElementById("camelCase").value;
  let camelCaseConversion = document.getElementById("camelCaseConversion");
  let errorMessage = document.getElementById("errorMessage");
  
  if(InputValidation(camelCase)) 
  {
    errorMessage.style.display = "none";
    camelCaseConversion.innerHTML = camelCase
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .split(' ')
      .map(x => CheckForAcronym(x))
      .join(" ");
  }
  
  else 
  {
    camelCaseConversion.innerHTML = "";
    errorMessage.style.display = "block";
  }
}


function InputValidation(input) 
{
    let regExValidation = /^[a-zA-Z]+$/;
    return input.match(regExValidation);
}


function CheckForAcronym(acronym) 
{
  let acronymList = ["BAH", "USA", "ABC", "BC"];
  let acronymPattern = /[A-Z][A-Z]+/g;
  
  if(acronymPattern.test(acronym)) 
  {
    if(acronymList.includes(acronym))
      return acronym;
    
    else if((!acronymList.includes(acronym)) &&
             ((acronym.charAt(0) == 'A') ||
              (acronym.charAt(0) == 'I'))) 
    {
      if(acronymList.includes(acronym.slice(1,))) 
        return acronym.slice(0,1) + " " + acronym.slice(1,);
    }
    
    else if((!acronymList.includes(acronym)) && 
             ((acronym.charAt(acronym.length-1) == 'A') ||
              (acronym.charAt(acronym.length-1) == 'I'))) 
    {
      if(acronymList.includes(acronym.slice(0,-1)))
        return acronym.slice(0,-1) + " " + acronym.slice(-1,);
    }
    
    return acronym.replace(/([A-Z])/g, ' $1');
  }
  
  return acronym;
}


/*

Test Case #1
Check result for an input containing numbers
Input: IAmABAHContractor1
Expected Result: Error

Test Case #2
Check result for an input containing special characters
Input: IAm@BAHContractor
Expected Result: Error

Test Case #3
Check result for no input
Input:
Expected Result: Error

Test Case #4
Check result for an input containing white space
Input: IAm A BAHEmployee
Expected Result: Error

Test Case #5
Check result for valid camel case input
Input: oneTwoThree
Expected Result: one Two Three

Test Case #6
Check result for an input containing an acronym in acronym list
Input: IAmABAHContractor
Expected Result: I Am A BAH Contractor

*/
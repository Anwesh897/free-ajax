const ourRequest = new XMLHttpRequest();
ourRequest.open('GET','/Users/akashkorram/Documents/jsonajax/main.json');
ourRequest.onload = ()=>{
    console.log(ourRequest.responseText);
}
ourRequest.send();
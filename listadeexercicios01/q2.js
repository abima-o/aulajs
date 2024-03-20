function conversionfahranheidt(celsius){
    return (celsius * 9/5) + 32;
}

function calcular(){
    let celsius = parseFloat(document.getElementById("celsius").value);
    let fahrenheit = conversionfahranheidt(celsius);
    
    return calcular;
}
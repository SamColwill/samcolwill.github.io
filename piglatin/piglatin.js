function piglatin() {
    
    const vowels = "aeoiu";

    var input = document.getElementById("input");

    const original = input.value.split(" ");

    let piglatin = "";
    for (let x of original) {
        if (!x == "") {
            if (vowels.includes(x.charAt(0))) {
                piglatin += x + "way ";
            } else if (!vowels.includes(x.charAt(0)) && !vowels.includes(x.charAt(1))) {
                piglatin += x.substring(2, x.length) + x.charAt(0) + x.charAt(1) + "ay ";
            } else {
                piglatin += x.substring(1, x.length) + x.charAt(0) + "ay ";
            }
        }
    }

    input.value = piglatin;
}

type Category = "Underweight (Severe thinness)" | "Underweight (Moderate thinness)"	| "Underweight (Mild thinness)"
    | "Normal range (healthy weight)" | "Overweight (Pre-obese)" | "Obese (Class I)"
    | "Obese (Class II)" | "Obese (Class III)"

const calculateBmi = (height: number, weight: number) : Category => {
    const m: number = height / 100
    const bmi: number = weight / (m*m);

    if( bmi < 16 ) {
        return "Underweight (Severe thinness)";
    } else if( bmi < 16.9) {
        return "Underweight (Moderate thinness)";	
    } else if(bmi < 18.4) {
        return "Underweight (Mild thinness)";
    } else if(bmi < 24.9) {
        return "Normal range (healthy weight)";
    } else if(bmi < 29.9) {
        return "Overweight (Pre-obese)";
    } else if(bmi <34.9) {
        return "Obese (Class I)";
    } else if(bmi <39.9) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
}

console.log(calculateBmi(181, 70))
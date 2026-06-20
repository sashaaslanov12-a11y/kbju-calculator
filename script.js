javascript
// ================= ПЕРЕКЛЮЧЕНИЕ ПОЛА =================

let gender = "Мужчина";

const maleBtn = document.getElementById("maleBtn");
const femaleBtn = document.getElementById("femaleBtn");

maleBtn.addEventListener("click", () => {
    gender = "Мужчина";

    maleBtn.classList.add("active");
    femaleBtn.classList.remove("active");
});

femaleBtn.addEventListener("click", () => {
    gender = "Женщина";

    femaleBtn.classList.add("active");
    maleBtn.classList.remove("active");
});

// ================= КНОПКА РАСЧЕТА =================

document
    .getElementById("calculateBtn")
    .addEventListener("click", calculate);


// ================= ФУНКЦИЯ ВЫВОДА КАРТОЧЕК =================

function makeCard(
    calories,
    proteins,
    fats,
    carbs,
    warning = false
) {
    let text =
        `🔥 ${Math.round(calories)} ккал\n\n` +
        `🥩 Белки: ${proteins.toFixed(1)} г\n` +
        `🥑 Жиры: ${fats.toFixed(1)} г\n` +
        `🍚 Углеводы: ${carbs.toFixed(1)} г`;

    if (warning) {
        text +=
            `\n\n⚠️ Жиры 0,8 г/кг.\nКрайне низкое количество.`;
    }

    return text;
}


// ================= ОСНОВНОЙ РАСЧЕТ =================

function calculate() {

    const weight =
        parseFloat(
            document.getElementById("weight").value
        );

    const height =
        parseFloat(
            document.getElementById("height").value
        );

    const age =
        parseInt(
            document.getElementById("age").value
        );

    const activity =
        parseFloat(
            document.getElementById("activity").value
        );

    if (
        isNaN(weight) ||
        isNaN(height) ||
        isNaN(age)
    ) {
        alert("Введите корректные данные.");
        return;
    }

    // ================= ХАРРИС И МИФФЛИН =================

    let harris;
    let mifflin;

    if (gender === "Мужчина") {

        harris =
            66.47 +
            13.75 * weight +
            5 * height -
            6.74 * age;

        mifflin =
            9.99 * weight +
            6.25 * height -
            4.92 * age +
            5;

    } else {

        harris =
            655.1 +
            9.6 * weight +
            1.85 * height -
            4.68 * age;

        mifflin =
            9.99 * weight +
            6.25 * height -
            4.92 * age -
            161;
    }

    const bmr =
        (harris + mifflin) / 2;

    const maintenance =
        bmr * activity;

    // ================= БЕЛКИ И ЖИРЫ =================

    let proteinNormal;
    let fatsNormal;

    let proteinDeficit;
    let fatsDeficit;

    let proteinSurplus;
    let fatsSurplus;

    if (gender === "Мужчина") {

        // Норма
        proteinNormal = weight * 1.75;
        fatsNormal = weight * 1;

        // Дефицит
        proteinDeficit = weight * 2.25;
        fatsDeficit = weight * 0.8;

        // Профицит
        proteinSurplus = weight * 2;
        fatsSurplus = weight * 1;

    } else {

        // Норма
        proteinNormal = weight * 1.75;
        fatsNormal = weight * 1;

        // Дефицит
        proteinDeficit = weight * 2;
        fatsDeficit = weight * 1;

        // Профицит
        proteinSurplus = weight * 2;
        fatsSurplus = weight * 1;
    }

    // ================= НОРМА =================

    const caloriesNormal =
        maintenance;

    let carbsNormal =
        (
            caloriesNormal
            - proteinNormal * 4
            - fatsNormal * 9
        ) / 4;

    if (carbsNormal < 0) {
        carbsNormal = 0;
    }

    // ================= ДЕФИЦИТ =================

    let carbsDeficit =
        carbsNormal - 50;

    if (carbsDeficit < 0) {
        carbsDeficit = 0;
    }

    const caloriesDeficit =
        proteinDeficit * 4 +
        fatsDeficit * 9 +
        carbsDeficit * 4;

    // ================= ПРОФИЦИТ =================

    const carbsSurplus =
        carbsNormal + 50;

    const caloriesSurplus =
        proteinSurplus * 4 +
        fatsSurplus * 9 +
        carbsSurplus * 4;

    // ================= ВЫВОД ФОРМУЛ =================

    document.getElementById(
        "formulaInfo"
    ).innerHTML =
        `
        Харрис-Бенедикт:
        ${Math.round(harris)} ккал
        <br><br>

        Миффлин-Сан Жеор:
        ${Math.round(mifflin)} ккал
        <br><br>

        Среднее:
        ${Math.round(bmr)} ккал
        <br><br>

        Поддержание:
        ${Math.round(maintenance)} ккал
        `;

    // ================= ВЫВОД КАРТОЧЕК =================

    document.getElementById(
        "deficit"
    ).innerText =
        makeCard(
            caloriesDeficit,
            proteinDeficit,
            fatsDeficit,
            carbsDeficit,
            gender === "Мужчина"
        );

    document.getElementById(
        "normal"
    ).innerText =
        makeCard(
            caloriesNormal,
            proteinNormal,
            fatsNormal,
            carbsNormal
        );

    document.getElementById(
        "surplus"
    ).innerText =
        makeCard(
            caloriesSurplus,
            proteinSurplus,
            fatsSurplus,
            carbsSurplus
        );
}

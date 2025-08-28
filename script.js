let lastInput = ""; // oxirgi yozilgan matnni saqlash uchun

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[’'`‘]/g, "'")   // turli apostroflarni bitta ko‘rinishga keltirish
    .replace(/[“”«»]/g, '"')   // turli qo‘shtirnoqlarni keltirish
    .replace(/[?.!,]/g, "")    // tinish belgilarini olib tashlash
    .trim();
}

function findAnswers() {
  const inputField = document.getElementById("inputQuestions");
  const input = inputField.value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!input) {
    resultsDiv.innerHTML = "<p>Iltimos, savollarni kiriting!</p>";
    return;
  }

  lastInput = input; // qidirishdan oldin oxirgi kirilgan matnni saqlab qo‘yamiz

  // Har bir qatorni olamiz
  const satrlar = input
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Variant belgilarini chiqarib tashlaymiz (A), B), 1), 2))
  const savollar = satrlar.filter(s => !/^[A-D]\)|^\d+\)/i.test(s));

  if (savollar.length === 0) {
    resultsDiv.innerHTML = "<p>Savol topilmadi (variantlar emas, savol kiriting)</p>";
    return;
  }

  savollar.forEach(savol => {
    const cleanSavol = normalizeText(savol);

    // 1️⃣ Bazadan aniq qidiramiz
    let topildi = data.find(item => normalizeText(item.savol) === cleanSavol);

    // 2️⃣ Agar topilmasa, o‘xshash qidiramiz
    if (!topildi) {
      topildi = data.find(item =>
        normalizeText(item.savol).includes(cleanSavol) ||
        cleanSavol.includes(normalizeText(item.savol))
      );
    }

    // Natijani chiqaramiz
    if (topildi) {
      resultsDiv.innerHTML += `
        <div class="question">
          <b>Savol:</b> ${savol}<br>
          <b>Javob:</b> ✅ ${topildi.javob}
        </div>
      `;
    } else {
      resultsDiv.innerHTML += `
        <div class="question">
          <b>Savol:</b> ${savol}<br>
          <b>Javob:</b> ❌ Topilmadi
        </div>
      `;
    }
  });
}

function clearAll() {
  document.getElementById("inputQuestions").value = "";
  document.getElementById("results").innerHTML = "";
}

function undoInput() {
  if (lastInput) {
    document.getElementById("inputQuestions").value = lastInput;
    lastInput = ""; // faqat bir marta qaytarish uchun
  } else {
    alert("Ortga qaytaradigan matn yo‘q!");
  }
}

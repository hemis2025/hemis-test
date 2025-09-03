let lastInput = ""; // oxirgi yozilgan matnni saqlash uchun

function findAnswers() {
  const inputField = document.getElementById("inputQuestions");
  const input = inputField.value.trim();

  const foundDiv = document.getElementById("found");
  const notFoundDiv = document.getElementById("notfound");

  foundDiv.innerHTML = "<h3>✅ Topilgan savollar</h3>";
  notFoundDiv.innerHTML = "<h3>❌ Topilmagan savollar</h3>";

  if (!input) {
    notFoundDiv.innerHTML += "<p>Iltimos, savollarni kiriting!</p>";
    return;
  }

  lastInput = input; // qidirishdan oldin oxirgi kirilgan matnni saqlab qo‘yamiz

  // Har bir qatorni olamiz
  const satrlar = input
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Variantlarni chiqarib tashlaymiz (masalan 1), 2), A), B))
  const savollar = satrlar.filter(s => !/^[A-D]\)|^\d+\)/i.test(s));

  if (savollar.length === 0) {
    notFoundDiv.innerHTML += "<p>Savol topilmadi (variantlar emas, savol kiriting)</p>";
    return;
  }

  savollar.forEach(savol => {
    // ❗ faqat to‘liq moslikni tekshiramiz
    let topildi = data.find(item => item.savol.trim() === savol.trim());

    if (topildi) {
      foundDiv.innerHTML += `
        <div class="question found">
          <b>Savol:</b> ${savol}<br>
          <b>Javob:</b> ${topildi.javob}
        </div>
      `;
    } else {
      notFoundDiv.innerHTML += `
        <div class="question notfound">
          <b>Savol:</b> ${savol}<br>
          <b>Javob:</b> Topilmadi
        </div>
      `;
    }
  });
}

function clearAll() {
  document.getElementById("inputQuestions").value = "";
  document.getElementById("found").innerHTML = "<h3>✅ Topilgan savollar</h3>";
  document.getElementById("notfound").innerHTML = "<h3>❌ Topilmagan savollar</h3>";
}

function undoInput() {
  if (lastInput) {
    document.getElementById("inputQuestions").value = lastInput;
    lastInput = ""; // faqat bir marta qaytarish uchun
  } else {
    alert("Ortga qaytaradigan matn yo‘q!");
  }
}

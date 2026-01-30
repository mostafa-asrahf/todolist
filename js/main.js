const input = document.getElementById('input');
const button = document.getElementById('button');
const tableBody = document.getElementById('tableBody');
const masege = document.getElementById('masege');


//localStorage بيخلّيك تخزن بيانات في المتصفح وتفضل موجودة:
// بعد Refresh
// بعد قفل وفتح الصفحة
// حتى لو قفلت المتصفح


// getItem("data")
// ده أمر في JavaScript
// بيجيب قيمة مخزنة في localStorage باسم data.
tableBody.innerHTML = localStorage.getItem("data") ||  "";
button.addEventListener("click", (e)=> {
    const value = input.value;
    if (value.trim() === "") {
        masege.textContent = "الرجاء إدخال مهمة";
        return;
    }
    tableBody.innerHTML += `<tr>
        <td>
        ${value}
        <span>
        <i class="fa-regular fa-calendar"></i>${new Date().toISOString().split('T')[0]}</span>
        </td>
        <td><i onclick="deleteTask(this)" class="fa-solid fa-trash"></i></td>
        <td><i onclick="doneTask(this)" class="fa-solid fa-check"></i></td>
        <td><i onclick="editTask(this)" class="fa-solid fa-pen"></i></td>
    </tr>
    `;

    localStorage.setItem("data", tableBody.innerHTML);
    input.value = "";
});
function deleteTask(el) {
    el.parentElement.parentElement.remove();
    localStorage.setItem("data", tableBody.innerHTML);
};
function doneTask(el) {
    const tr = el.closest("tr");

    tr.classList.toggle("completed");
    el.classList.toggle("active");

    localStorage.setItem("data", tableBody.innerHTML);
};
function editTask(el) {
    const tr = el.closest("tr");

    // ❌ لو المهمة متعلمة تم
    if (tr.classList.contains("completed")) {
        alert("لا يمكن تعديل مهمة تم إنجازها ✅");
        return;
    }

    const td = tr.querySelector("td");
    const currentText = td.childNodes[0].nodeValue.trim();
    const newText = prompt("قم بتعديل المهمة:", currentText);

    if (newText && newText.trim() !== "") {
        td.childNodes[0].nodeValue = newText + " ";
        localStorage.setItem("data", tableBody.innerHTML);
    }
}


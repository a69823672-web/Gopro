// =========================
// GoPro Rental Manager
// =========================

let available = JSON.parse(localStorage.getItem("available")) || [];
let rented = JSON.parse(localStorage.getItem("rented")) || [];

function save() {
    localStorage.setItem("available", JSON.stringify(available));
    localStorage.setItem("rented", JSON.stringify(rented));
    render();
}


// اضافه کردن دوربین
function addCamera() {

    const input = document.getElementById("cameraCode");
    const code = input.value.trim().toUpperCase();

    if (code === "") {
        alert("کد دوربین را وارد کنید.");
        return;
    }


    if (available.includes(code) || rented.some(c => c.code === code)) {

        alert("این کد قبلاً ثبت شده است.");
        return;

    }


    available.push(code);

    input.value = "";

    save();

}


// اجاره دادن دوربین
function rentCamera(index) {


    const customer = prompt("نام مشتری:");

    if (customer === null) return;


    const phone = prompt("شماره تماس:");

    if (phone === null) return;



    const cam = available.splice(index, 1)[0];


    rented.push({

        code: cam,

        customer: customer,

        phone: phone,

        date: new Date().toLocaleString("fa-IR")

    });


    save();

}



// برگشت دوربین
function returnCamera(index) {


    const cam = rented.splice(index, 1)[0];


    available.push(cam.code);


    save();

}



// حذف دوربین
function deleteCamera(index) {


    if (confirm("این دوربین حذف شود؟")) {


        available.splice(index, 1);


        save();


    }

}



// نمایش اطلاعات
function render() {


    const availableBox = document.getElementById("available");

    const rentedBox = document.getElementById("rented");



    availableBox.innerHTML = "";

    rentedBox.innerHTML = "";



    // تعداد دوربین اجاره داده شده
    document.getElementById("rentedCount").innerText = rented.length;



    if (available.length === 0) {


        availableBox.innerHTML =
        '<div class="empty">هیچ دوربینی موجود نیست.</div>';


    }



    available.forEach((cam, index) => {



        availableBox.innerHTML += `


        <div class="item">


            <span>📷 ${cam}</span>


            <div class="actions">


                <button class="rent" onclick="rentCamera(${index})">

                    اجاره بده

                </button>



                <button class="delete" onclick="deleteCamera(${index})">

                    حذف

                </button>


            </div>


        </div>


        `;


    });




    if (rented.length === 0) {


        rentedBox.innerHTML =
        '<div class="empty">هیچ دوربینی اجاره داده نشده است.</div>';


    }



    rented.forEach((cam, index) => {



        rentedBox.innerHTML += `


        <div class="item">


            <div>


                <b>📷 ${cam.code}</b>

                <br><br>


                👤 ${cam.customer}

                <br>


                📞 ${cam.phone}

                <br>


                📅 ${cam.date}


            </div>



            <div class="actions">


                <button class="return" onclick="returnCamera(${index})">

                    برگشت داده شد

                </button>


            </div>


        </div>


        `;



    });



}



render();

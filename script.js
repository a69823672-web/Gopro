let available = JSON.parse(localStorage.getItem("available")) || [];
let rented = JSON.parse(localStorage.getItem("rented")) || [];

let totalRentals = JSON.parse(localStorage.getItem("totalRentals")) || 0;


// ذخیره اطلاعات
function save(){

    localStorage.setItem("available", JSON.stringify(available));

    localStorage.setItem("rented", JSON.stringify(rented));

    localStorage.setItem("totalRentals", JSON.stringify(totalRentals));

    render();

}



// اضافه کردن دوربین
function addCamera(){

    let input = document.getElementById("cameraCode");

    let code = input.value.trim().toUpperCase();


    if(code === ""){

        alert("کد دوربین را وارد کن");

        return;

    }


    if(available.includes(code) || rented.some(item => item.code === code)){

        alert("این دوربین قبلاً ثبت شده");

        return;

    }


    available.push(code);

    input.value = "";

    save();

}



// اجاره دادن دوربین
function rentCamera(index){


    let customer = prompt("نام مشتری:");

    if(customer === null) return;



    let phone = prompt("شماره تماس:");

    if(phone === null) return;



    let camera = available.splice(index,1)[0];



    rented.push({

        code: camera,

        customer: customer,

        phone: phone,

        date: new Date().toLocaleString("fa-IR")

    });



    // افزایش تعداد کل اجاره‌ها
    totalRentals++;


    save();


}





// برگشت دوربین
function returnCamera(index){


    let camera = rented.splice(index,1)[0];


    available.push(camera.code);


    save();


}






// حذف دوربین
function deleteCamera(index){


    if(confirm("حذف شود؟")){

        available.splice(index,1);

        save();

    }


}







// نمایش اطلاعات
function render(){


    let availableBox = document.getElementById("available");

    let rentedBox = document.getElementById("rented");



    availableBox.innerHTML = "";

    rentedBox.innerHTML = "";



    // نمایش تعداد کل اجاره‌ها
    document.getElementById("rentedCount").innerText = totalRentals;





    if(available.length === 0){

        availableBox.innerHTML =
        `<div class="empty">هیچ دوربینی موجود نیست</div>`;

    }



    available.forEach((camera,index)=>{


        availableBox.innerHTML += `

        <div class="item">

            <span>
            📷 ${camera}
            </span>


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





    if(rented.length === 0){

        rentedBox.innerHTML =
        `<div class="empty">هیچ دوربینی اجاره داده نشده</div>`;

    }





    rented.forEach((camera,index)=>{


        rentedBox.innerHTML += `


        <div class="item">


            <div>

                <b>📷 ${camera.code}</b>

                <br><br>

                👤 ${camera.customer}

                <br>

                📞 ${camera.phone}

                <br>

                📅 ${camera.date}


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

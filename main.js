//Üzerinde işlem yapılcak elementlerin çağrılması ve değişken tanımlanması
const harcamaInput = document.getElementById("harcama")
const fiyatInput = document.getElementById("fiyat")
const liste = document.querySelector(".liste")
const payCheckbox = document.getElementById("ödeme")
const spanToplam = document.getElementById("toplam")

//Eklenmiş ürünlerin silinmesi için olay tanımlama
liste.addEventListener("click", handleClick)


//inputlar ile gönderilen fiyatların sürekli güncellenmesi
let harcama =[ ]

function günceltoplam(){
  var toplam = harcama.reduce(
        function topla(a,b){
            return a+b
        });
        spanToplam.innerText = toplam
}

function harcamaEkle(event){

    event.preventDefault()// preventDefault eventi engelliyor

    if( !harcamaInput.value || !fiyatInput.value ){   // ! işareti boş mu değil mi kontrol ediyor 
        alert("Lütfen boş alanları doldurunuz")
        return

    }
    
    const itemBox = document.createElement("div");
    itemBox.classList.add("item");
//Ödenen ürünler için oluşacak alanın farklı görünmesi
    if(payCheckbox.checked){
        itemBox.classList.add("ödendi");
    }
    
    itemBox.innerHTML = 
    `<h1>${harcamaInput.value} </h1>
     <h2> ${fiyatInput.value}</h2>
     
     <div class="buttons">
     <img id="edit" src="image/payment.png" alt="">
     <img id="delete" src="image/delete.png" alt="">
     </div>
    `
    ;

    
    liste.appendChild(itemBox);
//Ödemesi yapılmamış olan her girilen ürünün toplam harcama kısmına gönderilmesi
    if(!payCheckbox.checked){

        harcama.push(Number(fiyatInput.value));
    }

    günceltoplam();

    
// inputların içeriklerinin sıfırlanması
    harcamaInput.value = "";
    fiyatInput.value = "";
    //Her ekleme sonunda yeni ekleme için satıra otomatik fokuslanma
    harcamaInput.focus()

}


//Eklenen ürünlerin silinmesi
//Ödenmiş olanlar hariç tutularak silinme sonucu aynı zamanda toplam satırının da güncellenmesi

function handleClick(e){

    const clicked = e.target
    const harcamaKutusu = clicked.parentElement.parentElement;

    if(clicked.id == "delete" && !harcamaKutusu.classList.contains("ödendi")){
  harcamaKutusu.remove();
  const eksiltme = harcamaKutusu.querySelector('h2').innerText
  harcama.push(-Number(eksiltme));
  günceltoplam();
}else(clicked.id == "delete" && harcamaKutusu.classList.contains("ödendi"))
{

  harcamaKutusu.remove();
}
}
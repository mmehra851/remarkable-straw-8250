let globleData = []; 

counttheproducts()
function counttheproducts(){
let url = "https://server-com-wzh0.onrender.com/products"
fetch("")
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data)
    globleData=data
   filterForTable(data);
})

}
function filterForTable(data){
    let obj ={}
  for(let i=0;i<data.length;i++){
    if(!obj[data[i].category]){
        obj[data[i].category] = 1
    }else{
        obj[data[i].category]++
    }
  }
  console.log(obj)
  let count = 1;
  document.getElementById("append-product-here").innerHTML = ""
 for(let key in obj){
    let tr = document.createElement("tr")
    let td = document.createElement("td")
    td.innerText = count
    let td1 = document.createElement("td")
    td1.innerText = key
    let td2 = document.createElement("td")
    td2.innerText = obj[key]
    tr.append(td,td1,td2)
    document.getElementById("append-product-here").append(tr)
    count++
 }


}
// 'Sarees', 'Jewellery', 'Dresses', 'Mens Top Were', 'Beauty and health', 'Bags and Footwear', 'Home and Kitchen'

document.getElementById("button").addEventListener("click",()=>{
    let Category = document.getElementById("Category")
    let Title = document.getElementById("Title")
    let Price = document.getElementById("Price")
    let Image = document.getElementById("Image-Url")
    let Size = document.getElementById("size")
    let obj = {
        category : Category.value,
        title : Title.value,
        original_price : Price.value,
        images : [Image.value],
        sizes : Size.value
    }
    fetch("https://server-com-wzh0.onrender.com/products",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        // alert("Product added")
        Swal.fire('New Product Added')
        setTimeout(()=>{
            location.reload() 
        },3000)
    })
    .catch((err)=>{
        console.log(err);
        alert("error")
    })
})

// search here and delete also
document.getElementById('inpu').addEventListener('input',(e)=>{
    console.log("yes");

    let inpu=e.target.value
    let newArr=globleData.filter((ele,ind)=>{
       return ele.title.toLowerCase().includes(inpu)
    }) 
    if(inpu.length===0){
        document.getElementById("delete").innerHTML = ""
    }else{
        console.log(newArr)
        render(newArr)
    }
})

function render(data){
    document.getElementById("delete").innerHTML = ""
    data.forEach((ele,ind) => {
        let div=document.createElement("div")

        let deldiv = document.createElement("div")
        deldiv.setAttribute("class" , "deldiv")
        let title = document.createElement("h5")
        title.innerText = ele.title
        deldiv.append(title)
        let price = document.createElement("p")
        price.innerText = "Rs." + " " + ele.original_price
        let button = document.createElement("button")
        button.innerText = "Delete"
        button.addEventListener("click",()=>{
            let confi = Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
                if(result.isConfirmed){
                    deleteItem(ele.id)
                    console.log(ele.id);
                }
              })
           
        })
        div.append(deldiv,price,button)
        document.getElementById("delete").append(div)
    });
}

function deleteItem(id){
    fetch(`https://server-com-wzh0.onrender.com/products/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(obj)
    })
    .then((res)=> res.json())
    .then((data)=>{
        // console.log(data);counttheproducts
        counttheproducts()
        // alert("Item Deleted")

    })
    .catch((err)=>{
        console.log(err);
        alert("Item Not Deleted");
    })

}

// pending and completed


let orderedData = JSON.parse(localStorage.getItem("pending-order")) || []
let completeDat = JSON.parse(localStorage.getItem("complete-order")) || []
let completeData=[]
appendPending(orderedData)
console.log(orderedData)
appendComplete(completeDat)
console.log(completeDat);


function appendPending(data){
    document.getElementById("pending").innerHTML = ""
    data.forEach((ele,ind) => {
        let div=document.createElement("div")

        let titdiv = document.createElement("div")
        titdiv.setAttribute("class", "titlediv")
        let title = document.createElement("h5")
        title.innerText = ele.title
        titdiv.append(title)
        
        let image = document.createElement("img")
        image.src = ele.images[0]


        let pdiv = document.createElement("div")
        pdiv.setAttribute("class" , "pdiv")
        let price = document.createElement("p")
        price.innerText = "Rs." + " " + ele.original_price
        pdiv.append(price)
        
        let button = document.createElement("button")
        button.innerText = "Ship Order"
        button.addEventListener("click",()=>{
            let confi = Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Order Shipped',
                showConfirmButton: false,
                timer: 1500
              })
            if(confi){
                completeDat.push(ele)
                localStorage.setItem("complete-order",JSON.stringify(completeDat))
                data.splice(ind,1)
                localStorage.setItem("pending-order",JSON.stringify(orderedData))
                appendPending(orderedData)
                let temp = JSON.parse(localStorage.getItem("complete-order")) || []
                appendComplete(temp)
            }

        })
        div.append(image, titdiv,pdiv,button)
        document.getElementById("pending").append(div)
    });
}


function appendComplete(data){
    document.getElementById("complete").innerHTML = ""
    data.forEach((ele,ind) => {
        let div=document.createElement("div")
        let titdiv = document.createElement("div")
        titdiv.setAttribute("class", "titediv")
        let title = document.createElement("h5")
        title.innerText = ele.title
        titdiv.append(title)
        let image = document.createElement("img")
        image.src = ele.images[0]
        let price = document.createElement("p")
        price.innerText = "Rs." + " " + ele.original_price
        
        div.append(image, titdiv,price)
        document.getElementById("complete").append(div)
    });
}
var product = [{
    id: 1,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/1517290/capsule_616x353.jpg?t=1710259254',
    name: 'Battlefile',
    price: 1000,
    description: 'Battlefield Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Action'
}, {
    id: 2,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/365590/capsule_616x353.jpg?t=1711101159',
    name: 'Tomclancy',
    price: 600,
    description: 'Tomclancy Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Action'
}, {
    id: 3,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1698860631',
    name: 'Counter Stire',
    price: 0,
    description: 'Counter Stire Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Free_To_Play'
}, {
    id: 4,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/1628300/capsule_616x353.jpg?t=1678734695',
    name: 'Adventure Light',
    price: 500,
    description: 'Adventure Light Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Adventure'
}, {
    id: 5,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/2028782/header.jpg?t=1447358048',
    name: 'Skyrim',
    price: 1300,
    description: 'Skyrim Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'RPG'
}, {
    id: 6,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/2054970/capsule_616x353.jpg?t=1713231266',
    name: 'Dragon Dogma',
    price: 2000,
    description: 'Dragon Dogma Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Early_Access'
}, {
    id: 7,
    img: 'https://upload.wikimedia.org/wikipedia/en/3/31/Dota_2_Steam_artwork.jpg',
    name: 'Dota2',
    price: 0,
    description: 'Dpta2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Free_To_Play'
}, {
    id: 8,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/973580/capsule_616x353.jpg?t=1692600844',
    name: 'Sniper',
    price: 500,
    description: 'Sniper Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'Action'
}, {
    id: 9,
    img: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg?t=1711128146',
    name: 'Stardew',
    price: 900,
    description: 'Stardew Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'RPG'
}


];
//anoymous function, arrow fuction documentคือไฟล์ html
$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="OpenProductDetail(${i})" class="product-item ${product[i].type}" >
                <img class="img-product" src="${product[i].img}" alt="">
                <p class= "text-white flex items-center justify-center font-bold text-lg/[1.2vw] mt-2">${product[i].name}</p>
                <p class= "text-white flex items-center justify-center">${numberWithCommas(product[i].price)+' THB'}</p>
            </div>`;
    }
    $("#productlist").html(html);
    
})


function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


function searchsomething(elem) {
    // console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) ) {
            html += `<div onclick="OpenProductDetail(${i})" class="product-item ${product[i].type}"  >
                    <img class="img-product" src="${product[i].img}" alt="">
                     <p class= "text-white flex items-center justify-center font-bold text-lg/[1.2vw] mt-2">${product[i].name}</p>
                     <p class= "text-white flex items-center justify-center">${numberWithCommas(product[i].price+" THB")}</p>
            </div>`;
        }
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }

}


function searchproduct(param) {
    console.log(param)
    $(".product-item").css('display', 'none')
    if(param == 'All') {
        $(".product-item").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block');
    }
}


var productindex = 0;
function OpenProductDetail(index) {
    productindex = index;
    console.log(productindex)

    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closemodal() {
    $(".modal").css('display','none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }  
    }
    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)
}


function openCart() {
    $('#modalCart').css('display','flex')
    rendercart()
}


function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div id="mycart" class="cartlist">
                    <div class="cartlist-item">
                        <div class="cart-left">
                        <img src="${cart[i].img}" alt="">
                        <div class="cartlist-detail">
                            <p>${cart[i].name}</p>
                            <p>${numberWithCommas(cart[i].price*cart[i].count)}</p>
                        </div>
                        </div>
                        <div class="cart-right">
                            <p onclick=deinitems('-',${i}) class="btnc">-</p>
                            <p id="countitems${i}" class="mx-20">${cart[i].count}</p>
                            <p onclick=deinitems('+',${i}) class="btnc">+</p>
                        </div>
                    </div>
                </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}


function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}

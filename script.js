
let carrito = getCookie("carrito") || [];

function actualizarCarrito() {
    const carritoResumen = document.getElementById("carrito-resumen");
    carritoResumen.innerHTML = "";
    let total = 0;
if (carrito.length > 0) {
    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong> - 
            $${item.price} x ${item.quantity} = 
            $${(item.price * item.quantity).toFixed(2)}
            <button onclick="eliminarProducto('${item.id}')">Eliminar</button>
        `;
        carritoResumen.appendChild(li);
        total += item.price * item.quantity;
        if (item.quantity>20) {
            item.quantity=20; 
        }
    });
}

    document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`;
    setCookie("carrito", carrito ,30);
}
function añadirAlCarrito(producto) {
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) existente.quantity += producto.quantity;
    else carrito.push(producto);
    actualizarCarrito(); //guarda la cookie
}

// Elimina un producto del carrito
function eliminarProducto(productId) {
    carrito = carrito.filter((item) => item.id !== productId);
    actualizarCarrito();
}

// Vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Manejo de los botones de compra
document.querySelectorAll(".btn-comprar").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const productName = button.parentElement.querySelector("h3").innerText;
        const productPrice = parseFloat(button.parentElement.querySelector("p").innerText.replace("$", ""));
        const productQuantity = parseInt(button.parentElement.querySelector(".cantidad-producto").value);
        window.alert(productQuantity);
        const product = { id: productId, name: productName, price: productPrice, quantity: productQuantity };
        añadirAlCarrito(product);
    });
});

// Cambiar el tema de la página
function cambiarTema(theme) {
    document.body.className = theme;
    setCookie("tema", theme, 8600);
    //localStorage.setItem("tema", theme);
}

// Aplicar el tema guardado al cargar la página
window.addEventListener("load", () => {
    const temaGuardado= getCookie("tema")|| "theme-light";
    cambiarTema(temaGuardado);
});

// Mostrar u ocultar el carrito desplegable
document.getElementById("icono-carrito").addEventListener("click", () => {
    const carritoDesplegable = document.getElementById("carrito-desplegable");
    carritoDesplegable.style.display = carritoDesplegable.style.display === "block" ? "none" : "block";
});

// Inicializa las cantidades de los productos en 1
document.querySelectorAll(".cantidad-producto").forEach((input) => {
    input.value = 1;
});
function setCookie(name, value, days) {
    let date = new Date(); //creo un objeto de tipo fecha
    date.setTime(date.getTime() + (days * 24 * 60 * 60 *
    1000)); // lo convierte a milisegundos
    let expiration = "expires=" + date.toUTCString();
    document.cookie = name + "=" + JSON.stringify(value) + ";" + expiration +
    "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return "";
}

// Actualiza el carrito al cargar la página
actualizarCarrito();

let guantes=document.getElementById('guantes')
let casco=document.getElementById('casco')
let espinilleras=document.getElementById('espinilleras')
let bucal=document.getElementById('bucal')
let camiseta=document.getElementById('camiseta')

function filterProduct(){  
    let busqueda= document.getElementById('search-input').value;
    window.alert(busqueda);
    let container=document.getElementById('productos');
    container.innerHTML=`<h1>Busqueda: ${busqueda}</h1>`;
    if('camiseta'.includes(busqueda)){
        container.innerHTML+=camiseta.outerHTML;
    }
    if('casco'.includes(busqueda)){
        container.innerHTML+=casco.outerHTML;
    }
    if('espinilleras'.includes(busqueda)){
        container.innerHTML+=espinilleras.outerHTML;
    }
    
    if('guantes'.includes(busqueda)){
        container.innerHTML+=guantes.outerHTML;
    }
    if('bucal'.includes(bucal)){
        container.innerHTML+=bucal.outerHTML;
    }

}

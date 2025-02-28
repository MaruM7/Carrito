
let stockProductos = {
    guantes: 20,
    rashguard: 20,
    bucal: 20,
    espinilleras: 20,
    casco: 20
};
let descuentos = {
    a10: 10,
    b25: 25,
    c15: 15,
    d5: 5,
};
let valordescuento=0;
console.log(stockProductos)

function actualizarCarrito() {
    const carritoResumen = document.getElementById("carrito-resumen");
    carritoResumen.innerHTML = "";
    let total = 0;
    let subtotal = 0;

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
            subtotal += item.price * item.quantity;
        });
    }

    total = subtotal.toFixed(2) - valordescuento; // Aplica el descuento aquí
    let a = document.querySelector("#subtotal");
    a.innerHTML = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById("total").innerHTML = `Total: $${total.toFixed(2)}`;
    setCookie("carrito", carrito, 30);
}


function añadirAlCarrito(producto) {
    let existente = carrito.find((item) => item.id === producto.id);

    // Calculamos cuántos productos hay en el carrito actualmente
    let cantidadEnCarrito = existente ? existente.quantity : 0;
    
    // Cantidad total que se intentaría comprar
    let totalPedido = cantidadEnCarrito + producto.quantity;

    // Verificamos si hay suficiente stock
    if (totalPedido > stockProductos[producto.id]) {
        alert(`No hay suficiente stock de ${producto.name}. Puedes agregar hasta ${stockProductos[producto.id] - cantidadEnCarrito} unidades.`);
        return;
    }

    // Si hay stock suficiente, se agrega al carrito
    if (existente) {
        existente.quantity += producto.quantity;
    } else {
        carrito.push(producto);
    }

    // Reducimos el stock disponible
    stockProductos[producto.id] -= producto.quantity;

    actualizarCarrito();
    alert(`${producto.name} ha sido añadido al carrito.`);
}



// Función para eliminar un producto del carrito y devolver stock
function eliminarProducto(productId) {
    const producto = carrito.find((item) => item.id === productId);
    if (producto) {
        stockProductos[producto.id] += producto.quantity; // Devolver stock
    }
    carrito = carrito.filter((item) => item.id !== productId);
    actualizarCarrito();
}

// Vaciar el carrito y restaurar stock
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito.forEach((item) => {
        stockProductos[item.id] += item.quantity; // Devolver stock
    });
    carrito = [];
    actualizarCarrito();
});

document.querySelectorAll(".btn-comprar").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const productName = button.parentElement.querySelector("h3").innerText;
        const productPrice = parseFloat(button.parentElement.querySelector("p").innerText.replace("$", ""));
        const productQuantity = parseInt(button.parentElement.querySelector(".cantidad-producto").value);
        const product = { id: productId, name: productName, price: productPrice, quantity: productQuantity };
        añadirAlCarrito(product);
    });
});

function filterProduct() {  
    let busqueda = document.getElementById('search-input').value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    let encontrados = false;

    productos.forEach(producto => {
        let nombreProducto = producto.querySelector("h3").innerText.toLowerCase();

        if (nombreProducto.includes(busqueda)) {
            producto.style.display = "block";
            encontrados = true;
        } else {
            producto.style.display = "none"; 
        }
    });

    if (!encontrados) {
        alert("No se encontraron productos.");
    }
}

function cambiarTema(theme) {
    document.body.className = theme;
    setCookie("tema", theme, 8600);
}

window.addEventListener("load", () => {
    const temaGuardado = getCookie("tema") || "theme-light";
    cambiarTema(temaGuardado);
});

document.getElementById("icono-carrito").addEventListener("click", () => {
    const carritoDesplegable = document.getElementById("carrito-desplegable");
    carritoDesplegable.style.display = carritoDesplegable.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".cantidad-producto").forEach((input) => {
    input.value = 1;
});

// Funciones para manejar cookies
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expiration = "expires=" + date.toUTCString();
    document.cookie = name + "=" + JSON.stringify(value) + ";" + expiration + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
const productos2 = document.querySelectorAll(".producto");

productos2.forEach((producto) => {
    producto.addEventListener("mouseover", () => {
        producto.style.border = "2px solid blue";
        producto.style.transform = "scale(1.05)";
    });

    producto.addEventListener("mouseout", () => {
        producto.style.border = "1px solid #ccc";
        producto.style.transform = "scale(1)";
    });
});




    async function login() {
        const usuario = document.getElementById("username").value;
        const contraseña = document.getElementById("password").value;
        const mensaje = document.getElementById("loginMensaje");
    
    
        try {
            const respuesta = await fetch("http://localhost:3000/usuarios");
            const datos = await respuesta.json();
            console.log(respuesta); //Vemos que tiene dentro respuesta
            console.log(datos);
    
    
            if (usuario === datos.nombre && contraseña === datos.contraseña) {
                mensaje.style.color = "green";
                mensaje.textContent = "Acceso concedido";
            } else {
                mensaje.style.color = "red";
                mensaje.textContent = "Usuario o contraseña incorrectos";
            }
        } catch (error) {
            console.log(error);
            mensaje.style.color = "red";
            mensaje.textContent = "Error al conectar con el servidor";
        }
    }
    
    //Debéis actualizar el método onload
    window.onload = function() {
        carrito = getCookie("carrito") || [];
        actualizarCarrito();
        document.getElementById("loginBtn").addEventListener("click", function() {
            document.querySelector('dialog').showModal();
        });
       
        document.querySelector(".close").addEventListener("click", function() {
            document.querySelector('dialog').close();
        });
    };
    function aplicarDescuento() {
        const codigoDescuento = document.getElementById("codigo-descuento").value;
        const mensajeDescuento = document.getElementById("mensaje-descuento"); 
        const descuento = descuentos[codigoDescuento];
    
        if (descuento) {
            valordescuento = (subtotal * descuento) / 100; 
            mensajeDescuento.textContent = `Descuento del ${descuento}% aplicado.`;
            mensajeDescuento.style.color = "green";
        } else {
            valordescuento = 0; 
            mensajeDescuento.textContent = "Código de descuento inválido.";
            mensajeDescuento.style.color = "red";
        }
    
        actualizarCarrito();
    }
    
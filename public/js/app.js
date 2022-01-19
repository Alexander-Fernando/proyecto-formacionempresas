// VARIABLES DEL DOM
const contenedorProducto  = document.querySelector(".box");
const btnVaciar           = document.querySelector(".btn-vaciar")
const carrito             = document.querySelector("#carrito");
const contenedorCarrito   = document.querySelector("#lista-carrito tbody")
const totalPago           = document.querySelector("#totalPago");
const btnComprar          = document.querySelector('.comprarButton');
const btnAgregar          = document.querySelector('.btn-agregar');
let productosCarrito = [];

//FUNCIÓN GENERAL PARA CARGAR LOS EVENTS LISTENERS
cargarEventos();
function cargarEventos(){
    //Se dispara cuando se presionar agregar al carrito
    if(contenedorProducto){
        contenedorProducto.addEventListener('click', agregarCarrito)
    }

    //Alerta al agregar un producto al carrito
    if(btnAgregar){
        btnAgregar.addEventListener('click', () => {
            Swal.fire(
                'Bien hecho!',
                'Agregado correctamente a su carrito!',
                'success'
            )
        });
    }

    //Vaciar el carrito
    if(btnVaciar){
        btnVaciar.addEventListener('click', vaciarLS)
    }

    //Cuando se eliminar un producto del carrito
    if(carrito){
        carrito.addEventListener('click', eliminarProducto)
    }

    //NUEVO: Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {
        let alertas = document.querySelector('.alertas')
        if(alertas){
            limpiarAlertas();
        }

        //Cargando el carrito
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
}

function agregarCarrito(e){
    if(e.target.classList.contains('btn-agregar')){
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;  
        leerDatos(productoSeleccionado);
    }
}

function leerDatos(producto){
    const productoAgregar = {
        titulo          : producto.querySelector(".title").textContent,
        descripcion     : producto.querySelector("#descripcion").textContent,
        precio          : parseFloat(producto.querySelector("#precioNum").textContent),
        imagen          : producto.querySelector(".imagen").getAttribute('src'),
        id              : contenedorProducto.dataset.id,
        cantidad        : 1,
        autorProducto   : contenedorProducto.dataset.idautor
    }

    //RECORREMOS EL CARRITO PARA VER QUE NO SE AGREGUEN 2 PRODUCTOS IGUALES

    if(productosCarrito.some( prod => prod.titulo === productoAgregar.titulo)){
        const productos = productosCarrito.map( prod => {
            if(prod.titulo === productoAgregar.titulo){
                let cantidad = parseInt(prod.cantidad);
                cantidad++;
                prod.cantidad = cantidad;
                return prod;
            }else{
                return prod;
            }
        })
        productosCarrito = [...productos];
    }else{
        productosCarrito = [...productosCarrito, productoAgregar];
    }
    sincronizarStorage();
    carritoHTML();
}


function eliminarProducto(e){
    e.preventDefault();
    Swal.fire(
        'Bien hecho!',
        'Se ha eliminado correctamente!',
        'success'
    )
    if(e.target.classList.contains('borrar-curso')){
        const producto = e.target.parentElement.parentElement.parentElement;
        //Producto es la fila de la tabla
        const nombreProducto = producto.querySelector(".product-title a").textContent.trim();
       
        //Eliminar del arreglo del carrito
        productosCarrito = productosCarrito.filter(prod => prod.titulo !== nombreProducto);
        sincronizarStorage();
        carritoHTML();
    }
}


function carritoHTML(){
    vaciarCarrito();
    let precioTotal = 0

    if(productosCarrito.length == 0){
        if(btnComprar){
            btnComprar.disabled = true    
        }
    }


    productosCarrito.forEach( producto =>{
        //CÁLCULO DEL TOTAL SOLO PARA EL FRONTEND
        precioTotal += parseFloat(`${producto.precio*producto.cantidad}`)
        const row = document.createElement('tr');
        row.dataset.id = producto.id;
        row.innerHTML = `
            <td>
                <div class="product-item">
                    <a class="product-thumb" href="#">
                        <img 
                            src=${producto.imagen} width="10px" height="50px" alt="Imagen del producto" 
                        />
                    </a>

                    <div class="product-info">
                        <h4 class="product-title">
                            <a href="#"> ${producto.titulo}</a>
                        </h4>
                    </div>
                </div>
            </td>

            <td class="text-center">
                ${producto.cantidad}
            </td>

            <td class="text-center text-lg text-medium">
                S/. ${producto.precio*producto.cantidad}
            </td>

            <td class="text-center">
                <a 
                    class="remove-from-cart"
                    href="#"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Remove item"
                >
                    <i class="fa fa-trash  borrar-curso"></i>
                </a>
            </td>
        `

        if(contenedorCarrito){
            contenedorCarrito.appendChild(row);
        }
        //Nuevo: Agregar carrito de compras al storage
        sincronizarStorage();
        if(totalPago){
            totalPago.textContent = precioTotal;
        }
    })
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function vaciarCarrito(){
    if(contenedorCarrito){
        while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }
}

function vaciarLS(){
    Swal.fire(
        'Bien hecho!',
        'Se ha limpiado su carrito de compras!',
        'success'
    )
    vaciarCarrito();
    localStorage.clear();
    if(totalPago){
        totalPago.textContent = 0.0;
    }
}

const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas');
    const interval = setInterval(() => {
        if(alertas.children.length > 0){
            alertas.removeChild(alertas.children[0]);
        }else if(alertas.children.length === 0){
            alertas.parentElement.removeChild(alertas)
            clearInterval(interval)
        }
    }, 1500)
}

/* SCRIPTS PARA EL FORMULARIO DEL REGISTRO */
const inputs = document.querySelectorAll(".input");

function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

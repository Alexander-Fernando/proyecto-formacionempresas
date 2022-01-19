/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/***/ (() => {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// VARIABLES DEL DOM\nvar contenedorProducto = document.querySelector(\".box\");\nvar btnVaciar = document.querySelector(\".btn-vaciar\");\nvar carrito = document.querySelector(\"#carrito\");\nvar contenedorCarrito = document.querySelector(\"#lista-carrito tbody\");\nvar totalPago = document.querySelector(\"#totalPago\");\nvar btnComprar = document.querySelector('.comprarButton');\nvar btnAgregar = document.querySelector('.btn-agregar');\nvar productosCarrito = []; //FUNCIÓN GENERAL PARA CARGAR LOS EVENTS LISTENERS\n\ncargarEventos();\n\nfunction cargarEventos() {\n  //Se dispara cuando se presionar agregar al carrito\n  if (contenedorProducto) {\n    contenedorProducto.addEventListener('click', agregarCarrito);\n  } //Alerta al agregar un producto al carrito\n\n\n  if (btnAgregar) {\n    btnAgregar.addEventListener('click', function () {\n      Swal.fire('Bien hecho!', 'Agregado correctamente a su carrito!', 'success');\n    });\n  } //Vaciar el carrito\n\n\n  if (btnVaciar) {\n    btnVaciar.addEventListener('click', vaciarLS);\n  } //Cuando se eliminar un producto del carrito\n\n\n  if (carrito) {\n    carrito.addEventListener('click', eliminarProducto);\n  } //NUEVO: Contenido cargado\n\n\n  document.addEventListener('DOMContentLoaded', function () {\n    var alertas = document.querySelector('.alertas');\n\n    if (alertas) {\n      limpiarAlertas();\n    } //Cargando el carrito\n\n\n    productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];\n    carritoHTML();\n  });\n}\n\nfunction agregarCarrito(e) {\n  if (e.target.classList.contains('btn-agregar')) {\n    var productoSeleccionado = e.target.parentElement.parentElement.parentElement;\n    leerDatos(productoSeleccionado);\n  }\n}\n\nfunction leerDatos(producto) {\n  var productoAgregar = {\n    titulo: producto.querySelector(\".title\").textContent,\n    descripcion: producto.querySelector(\"#descripcion\").textContent,\n    precio: parseFloat(producto.querySelector(\"#precioNum\").textContent),\n    imagen: producto.querySelector(\".imagen\").getAttribute('src'),\n    id: contenedorProducto.dataset.id,\n    cantidad: 1,\n    autorProducto: contenedorProducto.dataset.idautor\n  }; //RECORREMOS EL CARRITO PARA VER QUE NO SE AGREGUEN 2 PRODUCTOS IGUALES\n\n  if (productosCarrito.some(function (prod) {\n    return prod.titulo === productoAgregar.titulo;\n  })) {\n    var productos = productosCarrito.map(function (prod) {\n      if (prod.titulo === productoAgregar.titulo) {\n        var cantidad = parseInt(prod.cantidad);\n        cantidad++;\n        prod.cantidad = cantidad;\n        return prod;\n      } else {\n        return prod;\n      }\n    });\n    productosCarrito = _toConsumableArray(productos);\n  } else {\n    productosCarrito = [].concat(_toConsumableArray(productosCarrito), [productoAgregar]);\n  }\n\n  sincronizarStorage();\n  carritoHTML();\n}\n\nfunction eliminarProducto(e) {\n  e.preventDefault();\n  Swal.fire('Bien hecho!', 'Se ha eliminado correctamente!', 'success');\n\n  if (e.target.classList.contains('borrar-curso')) {\n    var producto = e.target.parentElement.parentElement.parentElement; //Producto es la fila de la tabla\n\n    var nombreProducto = producto.querySelector(\".product-title a\").textContent.trim(); //Eliminar del arreglo del carrito\n\n    productosCarrito = productosCarrito.filter(function (prod) {\n      return prod.titulo !== nombreProducto;\n    });\n    sincronizarStorage();\n    carritoHTML();\n  }\n}\n\nfunction carritoHTML() {\n  vaciarCarrito();\n  var precioTotal = 0;\n\n  if (productosCarrito.length == 0) {\n    if (btnComprar) {\n      btnComprar.disabled = true;\n    }\n  }\n\n  productosCarrito.forEach(function (producto) {\n    //CÁLCULO DEL TOTAL SOLO PARA EL FRONTEND\n    precioTotal += parseFloat(\"\".concat(producto.precio * producto.cantidad));\n    var row = document.createElement('tr');\n    row.dataset.id = producto.id;\n    row.innerHTML = \"\\n            <td>\\n                <div class=\\\"product-item\\\">\\n                    <a class=\\\"product-thumb\\\" href=\\\"#\\\">\\n                        <img \\n                            src=\".concat(producto.imagen, \" width=\\\"10px\\\" height=\\\"50px\\\" alt=\\\"Imagen del producto\\\" \\n                        />\\n                    </a>\\n\\n                    <div class=\\\"product-info\\\">\\n                        <h4 class=\\\"product-title\\\">\\n                            <a href=\\\"#\\\"> \").concat(producto.titulo, \"</a>\\n                        </h4>\\n                    </div>\\n                </div>\\n            </td>\\n\\n            <td class=\\\"text-center\\\">\\n                \").concat(producto.cantidad, \"\\n            </td>\\n\\n            <td class=\\\"text-center text-lg text-medium\\\">\\n                S/. \").concat(producto.precio * producto.cantidad, \"\\n            </td>\\n\\n            <td class=\\\"text-center\\\">\\n                <a \\n                    class=\\\"remove-from-cart\\\"\\n                    href=\\\"#\\\"\\n                    data-toggle=\\\"tooltip\\\"\\n                    title=\\\"\\\"\\n                    data-original-title=\\\"Remove item\\\"\\n                >\\n                    <i class=\\\"fa fa-trash  borrar-curso\\\"></i>\\n                </a>\\n            </td>\\n        \");\n\n    if (contenedorCarrito) {\n      contenedorCarrito.appendChild(row);\n    } //Nuevo: Agregar carrito de compras al storage\n\n\n    sincronizarStorage();\n\n    if (totalPago) {\n      totalPago.textContent = precioTotal;\n    }\n  });\n}\n\nfunction sincronizarStorage() {\n  localStorage.setItem('carrito', JSON.stringify(productosCarrito));\n}\n\nfunction vaciarCarrito() {\n  if (contenedorCarrito) {\n    while (contenedorCarrito.firstChild) {\n      contenedorCarrito.removeChild(contenedorCarrito.firstChild);\n    }\n  }\n}\n\nfunction vaciarLS() {\n  Swal.fire('Bien hecho!', 'Se ha limpiado su carrito de compras!', 'success');\n  vaciarCarrito();\n  localStorage.clear();\n\n  if (totalPago) {\n    totalPago.textContent = 0.0;\n  }\n}\n\nvar limpiarAlertas = function limpiarAlertas() {\n  var alertas = document.querySelector('.alertas');\n  var interval = setInterval(function () {\n    if (alertas.children.length > 0) {\n      alertas.removeChild(alertas.children[0]);\n    } else if (alertas.children.length === 0) {\n      alertas.parentElement.removeChild(alertas);\n      clearInterval(interval);\n    }\n  }, 1500);\n};\n/* SCRIPTS PARA EL FORMULARIO DEL REGISTRO */\n\n\nvar inputs = document.querySelectorAll(\".input\");\n\nfunction addcl() {\n  var parent = this.parentNode.parentNode;\n  parent.classList.add(\"focus\");\n}\n\nfunction remcl() {\n  var parent = this.parentNode.parentNode;\n\n  if (this.value == \"\") {\n    parent.classList.remove(\"focus\");\n  }\n}\n\ninputs.forEach(function (input) {\n  input.addEventListener(\"focus\", addcl);\n  input.addEventListener(\"blur\", remcl);\n});\n\n//# sourceURL=webpack://EmprendeSM/./public/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/app.js"]();
/******/ 	
/******/ })()
;
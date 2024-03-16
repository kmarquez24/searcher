let loadProductJSON = (filtro) => {
    //Peticion asincrónica con fetch a un URL en formato JSON
    let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"
    let productos
    fetch(URL)
        .then(response => response.json())
        .then(result => {

            if (filtro === "") { productos = result }
            else {
                productos = result.filter(producto => producto.type.toUpperCase().includes(filtro.toUpperCase().trim()) ||
                    producto.name.toUpperCase().includes(filtro.toUpperCase().trim()))
            }
            let plantilla = ""

            for (i = 0; i < productos.length; i++) {
                plantilla = plantilla + `
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                    <div class="card card-blog card-plain">
                    <div class="card-header p-0 mt-n4 mx-3">
                        <a class="d-block shadow-xl border-radius-xl">
                        <img src="${productos[i].src}" alt="${productos[i].name}" class="img-fluid shadow border-radius-xl">
                        </a>
                    </div>
                    <div class="card-body p-3">
                        <p class="mb-0 text-sm">${productos[i].type}</p>
                        <a href="javascript:;">
                        <h5>
                            ${productos[i].name}
                        </h5>
                        </a>
                        <p class="mb-4 text-sm">
                        <b>Price: </b> $ ${result[i].price}
                        </p>
                    </div>
                    </div>
                </div>
                `
            }

            let productosHTML = document.getElementById("productos")
            productosHTML.innerHTML += plantilla
        })

        .catch(error => {

            /* Callback por fallo: Procese el error */

            console.log(error);

        });


}

let loadProductXML = (filtro) => {
    let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml"

    fetch(URL)
        .then(response => response.text())
        .then(result => {

            let xml = (new DOMParser()).parseFromString(result, 'application/xml');

            let productosAll = xml.getElementsByTagName("product")
            let plantilla = ""
            for (let producto of productosAll) {

                let name = producto.querySelector("name").innerHTML
                let price = producto.querySelector("price").innerHTML
                let src = producto.querySelector("src").innerHTML
                let type = producto.querySelector("type").innerHTML

                if (name.toUpperCase().includes(filtro.toUpperCase().trim()) || type.toUpperCase().includes(filtro.toUpperCase().trim())) {
                    plantilla = plantilla + `
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                        <div class="card card-blog card-plain">
                            <div class="card-header p-0 mt-n4 mx-3">
                                <a class="d-block shadow-xl border-radius-xl">
                                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                </a>
                            </div>
                            <div class="card-body p-3">
                                <p class="mb-0 text-sm">${type}</p>
                                <a href="javascript:;">
                                <h5>
                                    ${name}
                                </h5>
                                </a>
                                <p class="mb-4 text-sm">
                                <b>Price: </b> $ ${price}
                                </p>
                            </div>
                        </div>
                    </div>
                    `

                }
            }
            let productosHTML = document.getElementById("productos")
            productosHTML.innerHTML += plantilla
        })
        .catch(error => {

            /* Callback por fallo: Procese el error */

            console.log(error);

        });
}


let botonFiltrar = () => {
    let filterButton = document.getElementById("filter")

    filterButton.addEventListener("click", () => {
        let filtro = document.getElementById("text").value
        filtrarProductos(filtro)
    })
}


let inputFiltrar = () => {
    let filterText = document.getElementById("text")

    filterText.addEventListener("input", e => {
        let filtro = e.target.value.trim();
        filtrarProductos(filtro)
    })

}

let filtrarProductos = (filtro) => {

    limpiarProductos()
    loadProductJSON(filtro)
    loadProductXML(filtro)
    let productosHTML = document.getElementById("productos")
    if (productosHTML.innerHTML === "") {

        let plantilla = `<center><p>Resultados para: <strong>${filtro}</strong></p></center>`
        productosHTML.innerHTML = plantilla

    }
}

document.addEventListener("DOMContentLoaded", () => {
    let filtro = document.getElementById("text").value
    limpiarProductos()
    loadProductJSON(filtro)
    loadProductXML(filtro)
    botonFiltrar()
})

function limpiarProductos() {
    let productosHTML = document.getElementById("productos")
    productosHTML.innerHTML = ""
}


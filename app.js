// Selector Regiones
let selector = document.getElementById('S1')
selector.length = 0;
let sDefault = document.createElement('option');
sDefault.text = ':: Seleccione Region ::';
selector.add(sDefault);
selector.selectedIndex = 0;

// Selector Provincias
let selector2 = document.getElementById('S2');
selector2.length = 0;
let sDefault2 = document.createElement('option');
sDefault2.text = ':: Seleccione Provincia ::';
selector2.add(sDefault2);
selector2.selectedIndex = 0;

// Selector Comunas
let selector3 = document.getElementById('S3');
selector3.length = 0;
let sDefault3 = document.createElement('option');
sDefault3.text = ':: Seleccione Comuna ::';
selector3.add(sDefault3);
selector3.selectedIndex = 0;

let info; // Data del fetch con la primera iteracion de los elementos
let indiceTabla = 0; // Mantiene el indice la fila seleccionada de lista 

// Inputs
let inom = document.getElementById("_nom");
let iap = document.getElementById("_ap");
let iam = document.getElementById("_am");
let idir = document.getElementById("_dir");

// Lista
let gri = document.getElementById("_liCon");

// JSON Chile: https://api.jsonbin.io/b/5ee6b4ccccc9877ac37b9564

// Popula el primer indice al cargar
fetch('https://api.jsonbin.io/b/5ee6b4ccccc9877ac37b9564').then(
    function(respuesta){
        if (respuesta.status !== 200){  
            console.warn('Hubo un problema al conectar. Codigo: ' + respuesta.status);  
            return;  
        }

        respuesta.json().then(function(data){  
            info = data;
            for (let i = 0; i < data.length; i++){
                opcion = document.createElement('option');
                opcion.text = data[i].region;
                selector.add(opcion);
            }
        });
    }
).catch(function(error){  
    console.error('Error Fetch -', error);  
});

// Popula el segundo indice al genear cambios en el primero
function jsFunction(){
     selector2.length = 1;
    selector3.length = 1;

    let opcion;

    for(let j = 0; j < info[selector.selectedIndex -1].provincias.length; j++){
        opcion = document.createElement('option');
        opcion.text = info[selector.selectedIndex -1].provincias[j].name;
        selector2.add(opcion);
    }
}

// Popula el tercer indice al generar cambios en el segundo
function jsFunction2(){
    selector3.length = 1;

    let op;

    for(let k = 0; k < info[selector.selectedIndex -1].provincias[selector2.selectedIndex -1].comunas.length; k++){
        op = document.createElement('option');
        op.text = info[selector.selectedIndex -1].provincias[selector2.selectedIndex -1].comunas[k].name;
        selector3.add(op);
    }
}

// Crea una nueva fila en la lista o genera cambios en la fila seleccionada dependiendo del valor del indice
function getInput(){
    if((inom.value === '' && inom.hasAttribute('required')) |
    (iap.value === '' && iap.hasAttribute('required')) |
    (iam.value === '' && iam.hasAttribute('required')) |
    (idir.value === '' && idir.hasAttribute('required')) |
    (selector.selectedIndex === 0) |
    (selector2.selectedIndex === 0) | (selector3.selectedIndex === 0)){
        alert('Por favor complete todos los campos!');
    }else{
        let a = document.createElement("label");
        let b = document.createElement("label");
        let c = document.createElement("label");
        let d = document.createElement("label");
        let e = document.createElement("label");
        let f = document.createElement("label");
        let g = document.createElement("label");

        a.innerText = inom.value; 
        b.innerText = iap.value; 
        c.innerText = iam.value; 
        d.innerText = idir.value; 
        e.innerText = selector.options[selector.selectedIndex].text;
        f.innerText = selector2.options[selector2.selectedIndex].text;
        g.innerText = selector3.options[selector3.selectedIndex].text;

        let labels = [a, b, c, d, e, f, g];

        if(indiceTabla > 0){
            for(let i = 0; i < 7; i++){
                gri.rows[indiceTabla].cells[i].innerText = labels[i].innerText;
            }

            indiceTabla = 0;
        }else{
            let newRow = gri.insertRow(-1);
            newRow.addEventListener('click', logIndex);

            for(let i = 0; i < 7; i++){
                let newCell = newRow.insertCell(i);
                newCell.appendChild(labels[i]);
            }
        }

        inom.value = '';
        iap.value = '';
        iam.value = '';
        idir.value = '';

        selector.selectedIndex = 0;
        selector2.length = 1;
        selector3.length = 1;
    }    
}

// Traslada la informacion de la fila seleccionada de la lista al formulario
function logIndex(){
    let gri = document.getElementById("_liCon");
    
    let celdas = document.getElementById("_liCon").rows[this.rowIndex].cells;
    indiceTabla = this.rowIndex;
    
    let inom = document.getElementById("_nom");
    let iap = document.getElementById("_ap");
    let iam = document.getElementById("_am");
    let idir = document.getElementById("_dir");

    inom.value = celdas[0].textContent;
    iap.value = celdas[1].textContent;
    iam.value = celdas[2].textContent;
    idir.value = celdas[3].textContent;

    for(let i = 0; i < selector.length; i++){
        if(gri.rows[this.rowIndex].cells[4].innerText === selector.options[i].text){
            selector.selectedIndex = i;
        }
    }

    jsFunction();

    for(let i = 0; i < selector2.length; i++){
        if(gri.rows[this.rowIndex].cells[5].innerText === selector2.options[i].text){
            selector2.selectedIndex = i;
        }
    }

    jsFunction2();

    for(let i = 0; i < selector3.length; i++){
        if(gri.rows[this.rowIndex].cells[6].innerText === selector3.options[i].text){
            selector3.selectedIndex = i;
        }
    }
}

// Elimina una fila seleccionada de la lista
function eliminar(){
    if(indiceTabla === 0){
        alert("Seleccione un elemento de la lista primero");
    }else{
        gri.deleteRow(indiceTabla);

        inom.value = '';
        iap.value = '';
        iam.value = '';
        idir.value = '';

        selector.selectedIndex = 0;
        selector2.length = 1;
        selector3.length = 1;

        indiceTabla = 0;
    }
}
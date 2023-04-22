const ingresos = [
    new Ingreso('Salario',2100000),
    new Ingreso('venta coche', 5000000)
];

const egresos = [
    new Egreso('Renta departamento',900000),
    new Egreso('Ropa', 400000)
];


let cargarApp = () =>{
    cargarCabercero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}


let totalEgresos = () =>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabercero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = (totalIngresos() > 0) ? totalEgresos()/totalIngresos() : 0;
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('es-CO',{style:'currency', currency:'COP', minimumFractionDigits:0});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-CO',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor_ingreso">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick='eliminarIngreso(${ingreso.id})'>
            <ion-icon name="close-circle-outline" size="large"></ion-icon>
            </button>
        </div>
    </div>
</div>`;

return ingresoHTML;

}

const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let porcentajeEgreso = egreso.valor/totalIngresos();
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor_egreso">-${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick='eliminarEgreso(${egreso.id})'>
            <ion-icon name="close-circle-outline" size="large"></ion-icon>
            </button>
        </div>
    </div>
</div>`;

return egresoHTML;

}

const eliminarIngreso = (id) =>{
    if (confirm("¿Esta seguro de eliminar este ingreso?") == true) {
        let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
        ingresos.splice(indiceEliminar,1);
        cargarCabercero();
        cargarIngresos();
    } 
    
}

const eliminarEgreso = (id) =>{
    if (confirm("¿Esta seguro de eliminar este egreso?") == true) {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar,1);
    cargarCabercero();
    cargarEgresos();
    }
}

let agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && (valor.value >0 && valor.value !== '')){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabercero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value));
            cargarCabercero();
            cargarEgresos();
        }
    }else{

    }
}
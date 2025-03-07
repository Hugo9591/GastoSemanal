const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

//CLASES//
class Presupuesto{
    constructor( presupuesto ){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nvoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        //Sumar gastos para despues restarlos al total
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);
        this.calcularRestante();//Actualiza el valor si se borra un gasto
        
    }
}

class Interfaz{

    insertarPresupuesto(cantidad){
        const { presupuesto, restante } = cantidad;

        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger', 'animacion');
        }else{
            divMensaje.classList.add('alert-success', 'animacion');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos){
        this.limpiarHTML();
        gastos.forEach( gasto => {
            const { cantidad, nombre, id } = gasto;

            const nuevoGasto = document.createElement('LI');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.setAttribute('data-id', id);//Agegar el atributo data id con el valor id
        
            
            nuevoGasto.innerHTML = `${nombre} <span class='badge badge-primary badge-pill'>$${cantidad}</span>`;

            //Boton borrar
            const btnBorrar = document.createElement('BUTTON');
            btnBorrar.classList.add('btn1');
            btnBorrar.innerHTML = '&times';
            btnBorrar.onclick = () =>{
                eliminarGasto(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    calcularRestante(restante){
        document.querySelector('#restante').textContent =  restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const { presupuesto, restante } = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');

        //Comprar 25% y cambiar de color
        if((presupuesto / 4) > restante){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{///Reembolso
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        //si es total es menor a 0 mostrar mensaje
        if(restante <= 0){
            ui.imprimirAlerta('No hay presupuesto', 'error');
            //Bloquear boton
            formulario.querySelector('button[type="submit"]').disabled = true;
        }else{
            formulario.querySelector('button[type="submit"]').disabled = false;
        }
    }
}

//Instanciar con la clase interfaz
const ui = new Interfaz();
let presupuesto;

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto( presupuesto );
}

function agregarGasto(e){
    e.preventDefault();
    
    //extraer valores del input y validar 
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son Obligatorios', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Dato No Valido', 'error');
        return;
    }


    //
    const gasto = { nombre, cantidad, id: Date.now()}
    //Llenar el arreglo
    presupuesto.nvoGasto(gasto);

    ui.imprimirAlerta('Gasto Agregado Correctamente');

    const {gastos, restante} = presupuesto;

    ui.mostrarGastos(gastos);
    // console.log(gastos)
    // console.log(restante)
    // console.log(presupuesto)

    ui.calcularRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}

function eliminarGasto(id){
    presupuesto.eliminarGasto(id);

    const { gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);


    ui.calcularRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}
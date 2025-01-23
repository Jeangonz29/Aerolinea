//Crear selectores, varibles y eventos
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();

const name = document.getElementById('name').value;
const Localidad = document.getElementById('Localidad').value;
const Destino = document.getElementById('Destino').value;
const fecha_ida = new Date(document.getElementById('fecha_ida').value);
const fecha_regr = new Date(document.getElementById('fecha_regr').value);
const FechasValidacion = new Date();

/*Aqui es la validacion, condicion*/ 
if (fecha_ida < FechasValidacion || fecha_regr < FechasValidacion || fecha_regr < fecha_ida) {
    mostrarError('Por favor, ingrese fechas válidas.');
    return;
}


//Aqui estamos agg una tabla, con los datos que se ingresan en el formulario
//la parte del 0 es para que se vaya agregando en la tabla
    const table = document.getElementById('ReservacionesTable').getElementsByTagName('tbody')[0];
    const nuevaReserva = table.insertRow();
    nuevaReserva.insertCell(0).innerText = name;
    nuevaReserva.insertCell(1).innerText = Localidad;
    nuevaReserva.insertCell(2).innerText = Destino;
    nuevaReserva.insertCell(3).innerText = fecha_ida.toLocaleDateString();
    nuevaReserva.insertCell(4).innerText = fecha_regr.toLocaleDateString();

    const BtNAcciones = nuevaReserva.insertCell(5);

//este y el de abajo es una forma nueva de crear botones, o al menos asi lo entendi xd
    const CompletadoViaje = document.createElement('button');
    CompletadoViaje.innerText = 'Listo';
    CompletadoViaje.addEventListener('click', function() {
        nuevaReserva.classList.toggle('ListoTachado');
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        table.deleteRow(nuevaReserva.rowIndex - 1);
    });

    //no olvidar el appendChild para que se muestren
    BtNAcciones.appendChild(CompletadoViaje);
    BtNAcciones.appendChild(deleteButton);
    BtNAcciones.classList.add('BtnL-E');



    document.getElementById('formulario').reset();
});



//esta funcion de mostrar error la podemos reutilizar porque esta global
//Este nofuncionara OJO, porque no esta en el evento submit
function mostrarError(mensaje){
    const formulario =  document.querySelector('#formulario'); //Este va afuera
    const alertaM = document.createElement('div')
    alertaM.classList.add('error')
    //mostrar msh de error
    alertaM.innerHTML = `<strong>${mensaje}</strong>`
    //insertar en el HTML
    formulario.appendChild(alertaM)
    //bloque error va a desaparecer
     setTimeout(()=>{
        alertaM.remove();
    },2000)
}

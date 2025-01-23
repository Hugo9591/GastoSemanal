# Gasto Semanal

## Descripción
Una página web para administrar los gastos personales del usuario. Al cargarla, se solicita un presupuesto inicial validado. 
Luego, el usuario puede agregar gastos con nombre y precio, que se restarán automáticamente del presupuesto disponible. La aplicación muestra alertas visuales y mensajes 
según el estado del presupuesto. Además, permite eliminar gastos, restaurando el monto correspondiente al presupuesto. 
Toda la lógica está desarrollada con JavaScript mediante clases, utilizando Bootstrap y un archivo CSS personalizado.

## Funcion
- Presupuesto inicial: Al cargar la página, se solicita al usuario que ingrese un presupuesto válido.
- Registro de gastos: Se pueden agregar gastos indicando:
  - Nombre del gasto: Producto o servicio.
  - Precio del gasto: Monto que se gastó.
- Restante dinámico: Se actualiza automáticamente al agregar o eliminar gastos.
- Alertas visuales:
  - Color amarillo: Si el restante es menor al 50% del presupuesto inicial.
  - Color rojo: Si el restante es menor al 25% o si se excede el presupuesto.
- Eliminar gastos: Los gastos registrados pueden eliminarse, restaurando el monto al presupuesto restante.
- Mensajes de error: Notificaciones cuando se excede el presupuesto.
  
## Tecnologías utilizadas
- HTML: Estructura Principal
- JavaScript: Toda la lógica de la aplicación está implementada mediante clases.
- Bootstrap: Para el diseño de la interfaz de usuario.
- CSS personalizado: Para estilos adicionales y alertas específicas.

## Uso
1. Al cargar la página, ingresa tu presupuesto inicial en el campo solicitado.
2. Comienza a registrar tus gastos ingresando:
  - El nombre del gasto.
  - El precio del gasto.
3. Haz clic en el botón Agregar para registrarlo.
4. Observa cómo se actualiza el restante en tiempo real.
  - Los colores de alerta cambian dependiendo de tu presupuesto:
    - Verde: Presupuesto en buena condición.
    - Amarillo: Presupuesto menor al 50%.
    - Rojo: Presupuesto menor al 25% o en números negativos.
5. Para eliminar un gasto, haz clic en la "X" junto al gasto registrado.

## Ejemplo
- Presupuesto inicial: $1000.
- Gasto: Comida - $400.
- Restante: $600 (alerta amarilla si es menos del 50%).
- Gasto: Renta - $700.
- Restante: -$100 (alerta roja y mensaje "No hay presupuesto").

## Instalación
1. Clona este repositorio:
  git clone https://github.com/Hugo9591/GastoSemanal.git
2. Abre el archivo index.html en tu navegador.

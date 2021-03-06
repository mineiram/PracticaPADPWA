# PracticaPADPWA
Práctica realizada por Miguel Neira Martín para la asignatura "Programación de Aplicaciones para Dispositivos Móviles (PAD)" del grado en Ingeniería Informática, UCM.


[Enlace a la página utilizando Preact/HTM](https://mineiram.github.io/PracticaPADPWA/practicapadpwa_preact/)

[Enlace a la página sin utilizar Preact/HTM](https://mineiram.github.io/PracticaPADPWA/practicapadpwa_no_preact/)

Están subidas ambas versiones según el uso de Preact/HTM (PracticaPADPWA_preact) o no (PracticaPADPWA_no_preact).

A pesar del desconocimiento del uso de la librería Preact, he intentado hacerlo lo mejor posible dentro de los problemas que encontré en ciertos puntos del programa.
Estoy seguro de que se puede mejorar en términos de eficiencia y limpieza de código, pero parece que las diferentes pruebas que realicé al respecto no me dieron buenos resultados.

Los service workers no comprueban el número de versión ya que no debería subir más actualizaciones del proyecto, así que no hace falta reemplazar los archivos de caché.

Ambas versiones funcionan sin internet una vez han sido previamente visitadas. De hecho, en el caso de la versión con Preact/HTM, la respuesta a la importación de la librería externa ha sido almacenada en caché para su correcto funcionamiento en ausencia de conexión.

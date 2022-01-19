import threading
import time
import random

# 4. Se tiene un arreglo con 10 elementos (con enteros al azar), se dividen en bloques de 2 (de 0 al 4),
# implementar 3 hilos que ordenen el vector, cogiendo cada hilo un bloque a la vez

# declaracion de datos
longitud_bloque = 2
longitud_arreglo = 10
cantidad_bloques = int(longitud_arreglo / longitud_bloque)

# generacion de semaforos (se crea 1 semaforo por cada bloque)
sem = []
for _ in range(0, cantidad_bloques):
    sem.append(threading.Semaphore())

# generacion de arreglos
arreglo = [6, 4, 9, 6, 3, 0, 5, 2, 8, 7, 1]


# hilo
def ordenar_bloque(cantidad_bloques, longitud_bloque, hilo_actual):
    # ingresa a cada bloque
    for bloque_actual in range(0, cantidad_bloques):
        indice_inicial = bloque_actual * 2  # indice del primer valor del bloque
        indice_final = indice_inicial + longitud_bloque - 1  # indice del ultimo valor del bloque

        time.sleep(random.randint(0, 3))  # retardo aleatorio entre 0 a 3 segundos
        print("hilo: ", hilo_actual, "ingresando al bloque: ", bloque_actual)
        sem[bloque_actual].acquire()  # el semaforo 1 bloquea el bloque 1

        if (arreglo[indice_inicial] > arreglo[indice_final]):  # ordena cada bloque
            arreglo[indice_inicial], arreglo[indice_final] = arreglo[indice_final], arreglo[
                indice_inicial]  # intercambiando valores

        print("hilo: ", hilo_actual, "saliendo del bloque: ", bloque_actual)
        sem[bloque_actual].release()  # se libera el bloque 1


# creacion de hilos
h1 = threading.Thread(target=ordenar_bloque, args=(cantidad_bloques, longitud_bloque, 1))
h2 = threading.Thread(target=ordenar_bloque, args=(cantidad_bloques, longitud_bloque, 2))
h3 = threading.Thread(target=ordenar_bloque, args=(cantidad_bloques, longitud_bloque, 3))

h1.start()
h2.start()
h3.start()
h1.join()
h2.join()
h3.join()
print(arreglo)

for i in range(len(arreglo) - 1):
    for j in range(0, len(arreglo) - i - 1):
        if arreglo[j] > arreglo[j + 1]:
            arreglo[j], arreglo[j + 1] = arreglo[j + 1], arreglo[j]
print(arreglo)

for i in range(9):
    print("%d" % arreglo[i]),
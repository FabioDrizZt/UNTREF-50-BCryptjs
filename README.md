# Encriptación con bcryptjs

## Descripción

Este repositorio contiene un ejemplo práctico de cómo utilizar `bcryptjs` para encriptar y validar contraseñas en un entorno Node.js. La encriptación es un proceso clave en la seguridad de aplicaciones web, ya que permite proteger la información sensible, como las contraseñas de los usuarios.

## Teoría de Encriptación

La encriptación de contraseñas es una técnica utilizada para proteger las contraseñas almacenadas en bases de datos. En lugar de guardar las contraseñas en texto plano (lo cual es muy inseguro), las contraseñas se encriptan antes de ser almacenadas. Así, aunque alguien acceda a la base de datos, no podrá ver las contraseñas reales, sino versiones encriptadas de ellas.

`bcryptjs` es una librería de Node.js que permite realizar el proceso de encriptación de manera sencilla y segura. El proceso utiliza un algoritmo de hashing basado en *blowfish*, que incluye la adición de un "salt" (un valor aleatorio adicional) para hacer que el hash generado sea único, incluso si dos contraseñas idénticas son encriptadas.

### ¿Qué es un Hash?

Un hash es una cadena de longitud fija que se genera a partir de una entrada de datos de longitud variable (como una contraseña). Los hash son unidireccionales, lo que significa que es extremadamente difícil obtener el valor original a partir del hash.

### ¿Qué es un Salt?

El "salt" es un valor aleatorio añadido a la contraseña antes de aplicar la función de hashing. Esto asegura que incluso si dos usuarios tienen la misma contraseña, los hash generados serán diferentes. `bcryptjs` permite definir la cantidad de rondas de procesamiento (salt rounds) para aumentar la seguridad.

## Explicación del Código

### 1. Encriptación de Contraseñas

El siguiente fragmento de código muestra cómo se puede utilizar `bcryptjs` para encriptar una contraseña:

```javascript
const bcryptjs = require('bcryptjs')
process.loadEnvFile()

async function encriptarPWD () {
  const resultado = await bcryptjs.hash('Mi-passw0rd-#alg0+s3gur0', parseInt(process.env.SALTROUNDS))
  console.log('El hash resultante es: ', resultado)
}

encriptarPWD()
```

- **bcryptjs.hash()**: Esta función toma dos parámetros, la contraseña en texto plano y el número de *salt rounds* (definido en el archivo `.env` como `SALTROUNDS`). El número de rondas determina cuántas veces se aplicará el algoritmo de hash, incrementando la seguridad.
- En este ejemplo, la contraseña `Mi-passw0rd-#alg0+s3gur0` se encripta con un salt y luego se imprime el hash resultante en la consola.

### 2. Validación de Contraseñas

El siguiente código compara una contraseña ingresada con el hash almacenado en la base de datos:

```javascript
async function validarPWD (claveIngresada) {
  // Traemos la clave desde la BD
  const claveConHash = '$2a$14$jWBONfXMNRjOAv5b1nGGie/TKe40VcK7WDmRlk3L5MPMmUnoRWKr6'
  const comparacion = await bcryptjs.compare(claveIngresada, claveConHash)

  console.log(comparacion ? 'Las claves coinciden' : 'Tu usuario o contraseña no coinciden')
}

validarPWD('Mi-passw0rd-#alg0+s3gur0')
```

- **bcryptjs.compare()**: Compara la contraseña ingresada (`claveIngresada`) con el hash almacenado en la base de datos (`claveConHash`). Si la contraseña en texto plano coincide con el hash en la base de datos, se retornará `true`, de lo contrario, retornará `false`.
- En este caso, la contraseña `Mi-passw0rd-#alg0+s3gur0` se compara con un hash almacenado y, si coincide, se muestra el mensaje `Las claves coinciden`.

## Configuración del Proyecto

### 1. Clona el repositorio
```bash
git clone https://github.com/usuario/repo.git
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
Renombra el archivo `.env.sample` a `.env` y define la variable `SALTROUNDS`. Ejemplo:

```
SALTROUNDS=12
```

### 4. Ejecuta el código

Para probar la encriptación:
```bash
node bcrypt.js
```

## Pruebas y Seguridad

Es recomendable realizar pruebas de rendimiento en las funciones de encriptación y comparación de contraseñas con diferentes valores de `SALTROUNDS`. A mayor número de rondas, más seguro será el algoritmo, pero también aumentará el tiempo de procesamiento.

## Conclusión

El uso de `bcryptjs` en aplicaciones web es fundamental para proteger las contraseñas de los usuarios de manera efectiva. Mediante el uso de salt y un número elevado de rondas, se incrementa la seguridad de los datos, haciendo más difícil que posibles atacantes puedan descifrar las contraseñas almacenadas.

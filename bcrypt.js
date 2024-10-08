const bcryptjs = require('bcryptjs')
process.loadEnvFile()

async function encriptarPWD () {
  const resultado = await bcryptjs.hash('Mi-passw0rd-#alg0+s3gur0', parseInt(process.env.SALTROUNDS))
  console.log('El has resultante es: ', resultado)
}

encriptarPWD()

async function validarPWD (claveIngresada) {
  // Traemos la clave desde la BD
  const claveConHash = '$2a$14$jWBONfXMNRjOAv5b1nGGie/TKe40VcK7WDmRlk3L5MPMmUnoRWKr6'
  const comparacion = await bcryptjs.compare(claveIngresada, claveConHash)

  console.log(comparacion ? 'Las claves coinciden' : 'Tu usuario o contraseña no coinciden')
}

validarPWD('Mi-passw0rd-#alg0+s3gur0')

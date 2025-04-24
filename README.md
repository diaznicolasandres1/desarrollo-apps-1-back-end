# Despliegue de Backend en AWS usando Docker y ECS

### Preparación

1. **Requisitos Previos:**
   - Node.js/Nest.js funcionando localmente.
   - Docker instalado localmente.
   - Cuenta de AWS y AWS CLI configurados.

### Paso 1: Crear y Subir Imagen Docker

1. **Construir Dockerfile:**
   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY package.json .
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["node", "dist/main.js"]
   ```

2. **Construir Imagen Docker:**
   ```bash
   docker build -t back-end-recipes .
   ```

3. **Crear Repositorio ECR:**
   - En AWS ECR, crea un repositorio llamado `back-end-recipes`.

4. **Etiquetar y Subir Imagen a ECR:**
   ```bash
   aws ecr get-login-password --region tu-region | docker login --username AWS --password-stdin ACA_ACTUALIZAR_CON_LA_URL_QUE_VAYAMOS_A_USAR.amazonaws.com
   docker tag back-end-recipes:latest ACA_ACTUALIZAR_CON_LA_URL_QUE_VAYAMOS_A_USAR.amazonaws.com/back-end-recipes:latest
   docker push ACA_ACTUALIZAR_CON_LA_URL_QUE_VAYAMOS_A_USAR.dkr.ecr.tu-region.amazonaws.com/back-end-recipes:latest
   ```

### Paso 2: Desplegar en ECS

1. **Crear Clúster ECS:**
   - En la consola ECS, crea un nuevo clúster (tipo "EC2").

2. **Definir Tarea:**
   - Crea una nueva definición de tarea usando la imagen de ECR.
   - Configura el contenedor para usar el puerto 3000.

3. **Crear Servicio ECS:**
   - Utiliza la definición de tarea.
   - Asocia con una balanceadora de carga si es necesario.

4. **Configurar Redes:**
   - Asegura permisos de tráfico en el puerto 3000.

### Configuración de Base de Datos

- **MongoDB Atlas:**
  - Crea un cluster en MongoDB Atlas. (Similar a como hicimos con la de pruebas)
  - Permite IP de AWS para acceso.

- **Conectar desde NestJS:**
  - Configura la conexión en tu aplicación usando URI seguros.

# Generación de APK para `app-recipes` en Android Studio

### Requisitos Previos

- Tener Android Studio instalado.
- Abrir el proyecto `app-recipes` realizado en Kotlin dentro de Android Studio.

### Paso 1: Configuración Básica

1. **Abrir el Proyecto `app-recipes`:**
   - Tener abierto el proyecto `app-recipes` en Android Studio.

2. **Verificar Configuración del Build:**
   - Revisar el archivo `build.gradle (Module: app)` para confirmar que todo esté configurado correctamente:
     - **minSdkVersion y targetSdkVersion:** Revisar según los dispositivos que queramos puedan usar la aplicación.
     - **Dependencias:** Verificar que estén incluidas todas las bibliotecas necesarias que utiliza la aplicación.

### Paso 2: Configuración del Signing (Firma)

1. **Crear un Keystore:**
   - Navegar a `Build > Generate Signed Bundle/APK` en el menú superior.
   - Seleccionar `APK` y hacer clic en `Next`.
   - Si no existe un keystore, hacer clic en `Create new`:
     - **Key store path:** Seleccionar una ubicación segura para guardar `app-recipes-keystore.jks`.
     - **Password:** Elegir una contraseña segura para el keystore.
     - **Key alias:** Utilizar `appRecipesKey` para identificar la clave.
     - **Key password:** Seteamos la contraseña (puede ser diferente de la del keystore).

2. **Guardar Keystore:**
   - Almacenar esta información de manera segura.

### Paso 3: Generación del APK

1. **Generar APK Firmado:**
   - Navegar nuevamente a `Build > Generate Signed Bundle/APK`.
   - Elegir `APK` y hacer clic en `Next`.
   - Seleccionar el keystore guardado:
     - **Key store path:** Confirmar la ruta de `app-recipes-keystore.jks`.
     - **Key alias y Password:** Introducir los detalles del keystore.
   - Hacer clic en `Next`.

2. **Seleccionar Modo de Compilación:**
   - Elegir la opción `release` para una versión lista para distribución.
   - Activar las opciones V1 (Jar Signature) y V2 (Full APK Signature).

3. **Generar APK:**
   - Hacer clic en `Finish`.
   - Esperar que Android Studio compile el proyecto y genere el APK para `app-recipes`.

### Paso 4: Acceder al APK Generado

1. **Ubicar el APK:**
   - Al finalizar el proceso, un modal muestra dónde se encuentra el APK.
   - Normalmente, estará en `app-recipes/app/release/app-recipes-release.apk`.

2. **Verificar el APK:**
   - Probar el APK en un dispositivo físico o en un emulador para asegurar que todo funcione como se espera.


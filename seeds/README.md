# TableNest Seeds Documentation

## Comando de Seeds
Para ejecutar los seeds y poblar la base de datos con datos de ejemplo, puedes usar el siguiente comando:

- Recuerda que los seeds automáticamente ejecutan las migraciones antes de correr los seeds y borran los datos ya existentes en las tablas. No importa si sea un `up` o `down`, siempre se ejecutan las migraciones antes de los seeds.


### Para desarrollo:

- Up
```bash
npm run seed:up
```

- Down
```bash
npm run seed:down
```

### Para pruebas:
- Up
```bash
npm run seed:up mode=test
```

- Down
```bash
npm run seed:down mode=test
```

### Argumentos
- `mode`: Define el modo de ejecución:
    - `test`: Ejecuta los seeds en el entorno de pruebas
    - Cualquier otro valor o sin valor, ejecuta los seeds en el entorno de desarrollo.
    Ejemplo:
    ```bash
    npm run seed:up mode=test
    ```



- `users`: Define el número de usuarios a crear. Por defecto es 1000.
    - Valores menores a 0 o mayores a 1000 tomarán el valor por defecto.
    - Ejemplo:
    ```bash
    npm run seed:up users=500
    ```



# TableNest Test Documentation

## Estructura de los Tests

```
tests/
├── integration/
│   ├── controllers/
├── unit/
│   ├── controllers/
│   ├── middlewares/
│   ├── services/
├── helpers/
```

## Características Principales
- **Integración**: Pruebas que verifican el comportamiento de los controladores y la interacción con la base de datos.
- **Unitarias**: Pruebas que verifican el comportamiento de funciones individuales, como controladores, middlewares y servicios.
- **Helpers**: Funciones auxiliares que proporcionan funcionalidades reutilizables para las pruebas.


## Comando para ejecutar los tests
Para ejecutar los tests, puedes usar el siguiente comando:

- Los tesst no corren automáticamente las migraciones, por lo que debes asegurarte de que las migraciones estén actualizadas antes de ejecutar los tests.

- Los tests no corren en paralelo sino en secuencia

- Para ejecutar todos los tests:
```bash
npm run test
```

- Para ejecutar solo los tests unitarios:
```bash
npm run test:unit
```

- Para ejecutar solo los tests de integración:
```bash
npm run test:integration
```

- Para primer los tests unitarios y después los de integración:
```bash
npm run test:all
```

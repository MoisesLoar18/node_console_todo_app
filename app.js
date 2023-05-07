require("colors");

const { guardarDB, leerData } = require("./helpers/guardarArchivo");
const { confirmar, mostrarListadoCheckList } = require("./helpers/inquirer");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let optSelected = "";
  const tareas = new Tareas();

  const tareasDB = leerData();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    optSelected = await inquirerMenu();

    switch (optSelected) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listadoFiltrado();
        break;
      case "4":
        tareas.listadoFiltrado(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.completarTarea(ids);
        console.log(ids)
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if(ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        };
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (optSelected !== "0");
};

main();

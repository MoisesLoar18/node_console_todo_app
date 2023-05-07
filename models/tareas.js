const formatearTarea = require("../utils/formatearTarea");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor(_listado) {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  completarTarea(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      console.log(formatearTarea(tarea, i));
    });
  }

  listadoFiltrado(completados = true) {
    console.log();
    const tareasFiltradas = this.listadoArr.filter((tarea) =>
      completados ? tarea.completadoEn : !tarea.completadoEn
    );
    tareasFiltradas.forEach((tarea, i) => {
      console.log(formatearTarea(tarea, i));
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
}

module.exports = Tareas;

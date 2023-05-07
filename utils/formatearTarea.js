const formatearTarea = (tarea, i) => {
  const idx = `${i + 1}`.green;
  const { descripcion, completadoEn } = tarea;
  const estado = completadoEn ? "Completada".green : "Pendiente".red;
  return`${idx} ${descripcion} :: ${estado}`;
};

module.exports = formatearTarea;

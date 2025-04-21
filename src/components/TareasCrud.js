import React, { useState, useEffect } from "react";
import axios from "axios";

const TareasCrud = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({
    empleado: "",
    proyecto: "",
    descripcion: "",
    fechaInicio: "",
    diasEstimados: 0,
    estado: "pendiente",
  });
  const [tareaEditada, setTareaEditada] = useState(null);

  const apiUrl = "http://localhost:8080/api/tareas";

  // Obtener todas las tareas
  useEffect(() => {
    axios.get(apiUrl).then((response) => setTareas(response.data));
  }, []);

  // Crear una nueva tarea
  const crearTarea = () => {
    axios.post(apiUrl, nuevaTarea).then((response) => {
      setTareas([...tareas, response.data]);
      setNuevaTarea({
        empleado: "",
        proyecto: "",
        descripcion: "",
        fechaInicio: "",
        diasEstimados: 0,
        estado: "pendiente",
      });
    });
  };

  // Actualizar una tarea
  const actualizarTarea = (id) => {
    axios.put(`${apiUrl}/${id}`, tareaEditada).then((response) => {
      setTareas(
        tareas.map((tarea) => (tarea.id === id ? response.data : tarea))
      );
      setTareaEditada(null);
    });
  };

  // Eliminar una tarea
  const eliminarTarea = (id) => {
    axios.delete(`${apiUrl}/${id}`).then(() => {
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    });
  };

  return (
    <div className="App">
      <h1>CRUD de Tareas</h1>
      <div>
        <h2>Crear Tarea</h2>
        <input
          type="text"
          placeholder="Empleado"
          value={nuevaTarea.empleado}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, empleado: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Proyecto"
          value={nuevaTarea.proyecto}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, proyecto: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaTarea.descripcion}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Fecha de Inicio"
          value={nuevaTarea.fechaInicio}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, fechaInicio: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Días Estimados"
          value={nuevaTarea.diasEstimados}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, diasEstimados: e.target.value })
          }
        />
        <select
          value={nuevaTarea.estado}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, estado: e.target.value })
          }
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
        <button onClick={crearTarea}>Crear</button>
      </div>
      <div>
        <h2>Lista de Tareas</h2>
        {tareas.map((tarea) => (
          <div key={tarea.id}>
            {tareaEditada && tareaEditada.id === tarea.id ? (
              <div>
                <input
                  type="text"
                  value={tareaEditada.empleado}
                  onChange={(e) =>
                    setTareaEditada({ ...tareaEditada, empleado: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={tareaEditada.proyecto}
                  onChange={(e) =>
                    setTareaEditada({ ...tareaEditada, proyecto: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={tareaEditada.descripcion}
                  onChange={(e) =>
                    setTareaEditada({
                      ...tareaEditada,
                      descripcion: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  value={tareaEditada.fechaInicio}
                  onChange={(e) =>
                    setTareaEditada({
                      ...tareaEditada,
                      fechaInicio: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  value={tareaEditada.diasEstimados}
                  onChange={(e) =>
                    setTareaEditada({
                      ...tareaEditada,
                      diasEstimados: e.target.value,
                    })
                  }
                />
                <select
                  value={tareaEditada.estado}
                  onChange={(e) =>
                    setTareaEditada({ ...tareaEditada, estado: e.target.value })
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="completada">Completada</option>
                </select>
                <button onClick={() => actualizarTarea(tarea.id)}>Guardar</button>
              </div>
            ) : (
              <div>
                <h3>{tarea.empleado} - {tarea.proyecto}</h3>
                <p>{tarea.descripcion}</p>
                <p>Fecha Inicio: {tarea.fechaInicio}</p>
                <p>Días Estimados: {tarea.diasEstimados}</p>
                <p>Estado: {tarea.estado}</p>
                <button onClick={() => setTareaEditada(tarea)}>Editar</button>
                <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TareasCrud;
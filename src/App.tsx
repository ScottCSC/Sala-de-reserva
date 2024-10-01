import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Importa tu archivo de estilos

const SalaManager = () => {
  const [salas, setSalas] = useState({
    edificioA: Array(5).fill('verde'), // Inicializar en verde
    edificioB: Array(5).fill('verde'), // Inicializar en verde
  });

  const [selectedSala, setSelectedSala] = useState<any>(null);
  const [rut, setRut] = useState('');
  const [personas, setPersonas] = useState(0);

  // Cargar datos de Local Storage al iniciar
  useEffect(() => {
    const savedSalas = localStorage.getItem('salas');
    if (savedSalas) {
      setSalas(JSON.parse(savedSalas));
    }
  }, []);

  // Guardar en Local Storage cada vez que cambien las salas
  useEffect(() => {
    localStorage.setItem('salas', JSON.stringify(salas));
  }, [salas]);

  // Función para validar el RUT
  const validarRut = (rut: string) => {
    if (!/^[0-9]+-[0-9Kk]$/.test(rut)) {
      return false;
    }
    const [rutBase, digitoVerificador] = rut.split('-');
    let suma = 0;
    let multiplicador = 2;

    for (let i = rutBase.length - 1; i >= 0; i--) {
      suma += Number(rutBase[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    const dvFinal = dvCalculado === 10 ? 'K' : dvCalculado === 11 ? '0' : dvCalculado.toString();

    return digitoVerificador.toUpperCase() === dvFinal;
  };

  const handleSalaClick = (edificio: string, index: number) => {
    if (selectedSala && selectedSala.edificio === edificio && selectedSala.index === index) {
      // Si la sala ya está seleccionada, cerramos el menú
      setSelectedSala(null);
    } else {
      // Si no, seleccionamos la nueva sala
      setSelectedSala({ edificio, index });
    }
  };

  const confirmarAsignacion = () => {
    if (!validarRut(rut)) {
      toast.error('El RUT ingresado no es válido.');
      return;
    }

    if (personas > 8) {
      toast.error('El máximo permitido es 8 personas.');
      return;
    }

    asignarSala();
  };

  const asignarSala = () => {
    const { edificio, index } = selectedSala;

    const newSalas = { ...salas };
    newSalas[edificio as keyof typeof salas][index] = 'rojo'; // Cambiar al color rojo (ocupado)
    setSalas(newSalas);
    setSelectedSala(null); // Cerrar modal
    toast.success('Sala asignada exitosamente.');
    setRut(""); // Limpiar inputs
    setPersonas(0);
  };

  const liberarSala = (edificio: string, index: number) => {
    const newSalas = { ...salas };
    newSalas[edificio as keyof typeof salas][index] = 'verde'; // Cambiar al color verde (disponible)
    setSalas(newSalas);
    toast.success('Sala liberada exitosamente.');
  };

  return (
    <div className="container">
      <h1>Asignación de Salas</h1>
      <div className="edificio">
        <h2>Edificio A</h2>
        {salas.edificioA.map((estado, index) => (
          <div key={index} className="sala" data-estado={estado}>
            <div
              style={{
                backgroundColor: estado,
                width: '100px',
                height: '100px',
                display: 'inline-block',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                border: '2px solid black', // Borde para destacar la sala
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Sombra para dar profundidad
              }}
              onClick={() => handleSalaClick('edificioA', index)}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Sala {index + 1}
            </div>
            {selectedSala && selectedSala.edificio === 'edificioA' && selectedSala.index === index && (
              <div className="menu-asignacion">
                <h3>Asignar Sala {index + 1} en Edificio A</h3>
                <div>
                  <label>RUT: </label>
                  <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
                </div>
                <div>
                  <label>Número de personas (máximo 8): </label>
                  <input
                    type="number"
                    value={personas}
                    onChange={(e) => setPersonas(Number(e.target.value))}
                  />
                </div>
                <button className="btn btn-primary" onClick={confirmarAsignacion}>Asignar Sala</button>
                <button className="btn btn-secondary" onClick={() => setSelectedSala(null)}>Cancelar</button>
              </div>
            )}
            {estado === 'rojo' && (
              <button className="btn btn-secondary" onClick={() => liberarSala('edificioA', index)}>Liberar Sala</button>
            )}
          </div>
        ))}
      </div>

      <div className="edificio">
        <h2>Edificio B</h2>
        {salas.edificioB.map((estado, index) => (
          <div key={index} className="sala">
            <div
              style={{
                backgroundColor: estado, // Aquí se define el color según el estado ('verde' o 'rojo')
                width: '100px',
                height: '100px',
                display: 'inline-block',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                border: '2px solid black',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => handleSalaClick('edificioA', index)}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Sala {index + 1}
            </div>

            {selectedSala && selectedSala.edificio === 'edificioB' && selectedSala.index === index && (
              <div className="menu-asignacion">
                <h3>Asignar Sala {index + 1} en Edificio B</h3>
                <div>
                  <label>RUT: </label>
                  <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
                </div>
                <div>
                  <label>Número de personas (máximo 8): </label>
                  <input
                    type="number"
                    value={personas}
                    onChange={(e) => setPersonas(Number(e.target.value))}
                  />
                </div>
                <button className="btn btn-primary" onClick={confirmarAsignacion}>Asignar Sala</button>
                <button className="btn btn-secondary" onClick={() => setSelectedSala(null)}>Cancelar</button>
              </div>
            )}
            {estado === 'rojo' && (
              <button className="btn btn-secondary" onClick={() => liberarSala('edificioB', index)}>Liberar Sala</button>
            )}
          </div>

        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SalaManager;

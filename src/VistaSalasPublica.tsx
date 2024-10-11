import React from 'react';

interface Sala {
    estado: string;
    rut: string;
    personas: number;
    carrera: string;
}

interface SalasProps {
    salas: {
        edificioA: Sala[];
        edificioB: Sala[];
    };
    onLoginClick: () => void;
}

const VistaSalasPublica: React.FC<SalasProps> = ({ salas, onLoginClick }) => {
    return (
        <div className="container">
            <h1>Estado de las Salas</h1>
            <div className="edificio">
                <h2>Edificio A</h2>
                {salas.edificioA.map((sala, index) => (
                    <div key={index} className="sala" data-estado={sala.estado}>
                        Sala {index + 1}
                    </div>
                ))}
            </div>
            <div className="edificio">
                <h2>Edificio B</h2>
                {salas.edificioB.map((sala, index) => (
                    <div key={index} className="sala" data-estado={sala.estado}>
                        Sala {index + 7}
                    </div>
                ))}
            </div>
            <button onClick={onLoginClick} className="btn btn-primary">Iniciar Sesión</button>
        </div>
    );
};

export default VistaSalasPublica;
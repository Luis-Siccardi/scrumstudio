function toggleContent(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function showPhase(phase) {
    const details = document.getElementById('phase-details');
    
    const phaseInfo = {
        'inicio': `
            <h3>🚀 Fase de Inicio</h3>
            <ol>
                <li><strong>Crear la visión del proyecto</strong> - Se define la visión y el Product Owner</li>
                <li><strong>Identificar Scrum Master y stakeholders</strong> - El Product Owner ayuda a elegir</li>
                <li><strong>Formar el equipo Scrum</strong> - Miembros autoorganizados y colaborativos</li>
                <li><strong>Desarrollar épicas</strong> - Historias grandes basadas en necesidades de usuarios</li>
                <li><strong>Crear el backlog priorizado</strong> - Refinar épicas y ordenarlas por valor</li>
                <li><strong>Planificar la liberación</strong> - Definir cronograma y duración del sprint</li>
            </ol>
        `,
        'planificacion': `
            <h3>📋 Fase de Planificación y Estimación</h3>
            <ol>
                <li><strong>Crear historias de usuario</strong> - Las escribe el Product Owner</li>
                <li><strong>Estimar historias de usuario</strong> - Se mide esfuerzo con el equipo</li>
                <li><strong>Comprometer historias de usuario</strong> - Se aprueban e ingresan al sprint</li>
                <li><strong>Identificar tareas</strong> - Se desglosan las historias en tareas concretas</li>
                <li><strong>Estimar tareas</strong> - Se estima esfuerzo por tarea</li>
                <li><strong>Actualizar el backlog del sprint</strong> - Se agregan detalles en planificación</li>
            </ol>
        `,
        'implementacion': `
            <h3>⚙️ Fase de Implementación</h3>
            <ol>
                <li><strong>Crear entregables</strong> - El equipo trabaja usando un Scrumboard</li>
                <li><strong>Realizar Daily Standup</strong> - Reunión diaria (10 min) para revisar avances</li>
                <li><strong>Refinar el backlog del producto</strong> - Se actualiza según cambios</li>
            </ol>
        `,
        'revision': `
            <h3>🔍 Fase de Revisión y Retrospectiva</h3>
            <ol>
                <li><strong>Demostrar y validar el sprint</strong> - Se presentan entregables al Product Owner</li>
                <li><strong>Retrospectiva del sprint</strong> - El equipo reflexiona y mejora procesos</li>
            </ol>
        `,
        'liberacion': `
            <h3>🚀 Fase de Liberación</h3>
            <ol>
                <li><strong>Enviar entregables</strong> - Se entregan los productos aprobados</li>
                <li><strong>Retrospectiva de la liberación</strong> - Se analiza el proyecto completo</li>
            </ol>
        `
    };
    
    details.innerHTML = phaseInfo[phase] || '<p>Selecciona una fase para ver los detalles</p>';
}

// Animación de entrada para las secciones
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

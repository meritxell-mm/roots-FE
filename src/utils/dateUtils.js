export const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('ca-ES', { //TODO canviar segons idioma
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

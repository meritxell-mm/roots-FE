export const getFullName = (member) => {
    return [member.name, member.surname1, member.surname2].filter(Boolean).join(' ');
};
export const saveProfileId = (userData) => {
    localStorage.setItem('id', userData.id);
}

export const getProfileId = () => {
    const id = localStorage.getItem('id')
    return id ?? '';
}
import axios from 'axios';
const api = axios.create({
    baseURL: `https://64db5089593f57e435b0c522.mockapi.io`,
});

const GetAxiosData = (apiUrl) => {
    return api
        .get(apiUrl)
}
const PostAxiosData = (apiUrl, formData) => {
    return api
        .post(apiUrl, formData)
}
const DeleteAxiosData = (apiUrl, employees, setEmployees) => {
    return api
        .delete(apiUrl)
}

export { GetAxiosData, PostAxiosData, DeleteAxiosData };
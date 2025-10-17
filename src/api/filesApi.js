import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

console.log("bas",baseUrl)
const API = axios.create({
    baseURL: baseUrl
  });

export const fetchFiles = async ({page = 1, limit = 5, name_like = '', sort = 'uploadedAt', order = 'desc', pagination = true}) => {
    const params = {_sort: sort, _order: order};
    console.log("bas",baseUrl)
    console.log("apiurl", page, limit, name_like, sort, order, pagination)
    if (pagination) {
        params._page = page;
        params._per_page = limit;
        delete params.name_like
    }
    if (name_like) {
        params.name = name_like
    }
    console.log(params)
    const res = await API.get('/files', {params});
    if (pagination) {
        return res.data;
    } else {
        return {data: res};
    }

};


export const addFileMetadata = async (metadata) => {
    const res = await API.post('/files', metadata);
    return res.data;
};

export const deleteFile = async (id) => {
    const res = await API.delete(`/files/${id}`);
    return res.data;
};

export default {fetchFiles, addFileMetadata, deleteFile};

import { useQuery } from '@tanstack/react-query';
import { fetchFiles } from '../api/FilesApi.js';


export default function useFiles(page, limit, name_like, sort, order,pagination) {
    return useQuery({
        queryKey: ['files', page, limit, name_like, sort, order,pagination],
        queryFn: () => fetchFiles({ page, limit, name_like, sort, order,pagination }),
        keepPreviousData: true, // smoother pagination
    });
}

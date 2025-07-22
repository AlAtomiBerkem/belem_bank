import { useNavigate, useParams } from 'react-router-dom';

export const useBackBtnLogick = (basePath = '/documents') => {
    const navigate = useNavigate();
    const { '*': splat } = useParams();
    const pathArr = splat ? splat.split('/') : [];

    const goBack = () => {
        if (pathArr.length > 0) {
            navigate(basePath + (pathArr.length > 1 ? '/' + pathArr.slice(0, -1).join('/') : ''));
        } else {
            navigate('/');
        }
    };
    return goBack;
};
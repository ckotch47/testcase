
interface body{
    massage: 'success' | 'fail';
    status: 200 | 401 | 500;
    response: users[]
}


interface users{
    id: number;
    name: string;
    surname: string
    order: order[] | []
}

interface order{
    id: string;
    detail: string;
    product: product[]
}

interface product{
    id: number;
    name: string;
}

export {body, users, order, product}
export class ProductEntity{
    id: number;
    name: string;

    static getAll() {
            return [
                {
                    id: 1,
                    name: '1'
                },
                {
                    id: 2,
                    name: '2'
                },
                {
                    id: 3,
                    name: '3'
                }
            ]
    }
}



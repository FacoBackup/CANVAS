import {v4 as uuid4} from 'uuid';

export default {
    id: uuid4().toString(),
    subject: 'Sem título',
    dimensions: {
        width: 10000,
        height: 10000
    },
    pages: [
        {
            title: 'Página 1',
            nodes: [],
            links: []
        }
    ],

    connectionType: 'strong-path'
}
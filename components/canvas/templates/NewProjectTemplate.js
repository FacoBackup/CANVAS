import {v4 as uuid4} from 'uuid';

export default {
    id: uuid4().toString(),
    subject: 'Sem título',
    pages: [
        {
            title: 'Página 1',
            nodes: [],
            links: []
        }
    ],
    dimensions: {
        width: 10000,
        height: 10000
    },
    styling: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Roboto'
    },
    connectionType: 'strong-path'
}
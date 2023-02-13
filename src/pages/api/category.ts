import type { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseConnector } from '@/utils/DatabaseConnector';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const {body, method} = req; 
    const db: DatabaseConnector = new DatabaseConnector(); 
    let query = ""
    let resultset = null;
    switch (method) {
        case 'GET':
            query = `SELECT * FROM dbo.category`; 
            resultset = await db.ConnectAndQuery(query); 
            res.status(200).json({result: resultset.recordset});
            break; 
        case 'POST': 
            console.log(body);
            query = `INSERT INTO dbo.category (category_name, admin_id) VALUES ('${body.category_name}', '${body.admin_id}')`; 
            resultset = await db.ConnectAndQuery(query);
            res.status(200).json({result: 'Successfully added new category'});
            break;
        default: 
            res.setHeader('Allow', ['GET', 'POST']); 
            res.status(405).end(`Method ${method} Not Allowed`); 
    }
}

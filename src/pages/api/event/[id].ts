import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const { query, body, method } = req;
    console.log(query);
    const id = parseInt(query.id as string, 10); 
    const db: DatabaseConnector = new DatabaseConnector();
    let sql;
    let resultset;
    
    switch (method){
        case 'PUT':
            sql = `UPDATE dbo.event 
                     SET event_date = CONVERT(date, '${body.event_date}'), event_name = '${body.event_name}', admin_id = '${body.admin_id}', category_id = ${body.category_id}
                     WHERE event_id = ${id}`;
            resultset = await db.ConnectAndQuery(sql); 
            res.status(200).json({result: `Successfully update row with event_id = ${id}`}); 
            break; 
        default:
            res.setHeader('Allow', ['PUT']); 
            res.status(405).end(`Method ${method} Not Allowed`);             
    }

}
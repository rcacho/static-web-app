import { DatabaseConnector } from '@/utils/DatabaseConnector'
import event from '../src/pages/api/event'
import eventid from '../src/pages/api/event/[id]'
import { testApiHandler } from 'next-test-api-route-handler'
import { CategoryDAO } from '@/utils/dao/CategoryDAO'
import { icons } from '@/interfaces/Icons'

function generateRandomString(length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

describe('Test Event API Endpoints', () => {
  let db: DatabaseConnector
  let baseCategoryId: number
  const adminOID = process.env.ADMIN_OID!
  const nonAdminToken = `Bearer ${process.env.NON_ADMIN_JWT_TOKEN}`
  const adminToken = `Bearer ${process.env.ADMIN_JWT_TOKEN}`

  beforeAll(async () => {
    db = new DatabaseConnector()

    const dao = new CategoryDAO(db)

    const icon: keyof typeof icons = 'CircleIcon'

    const baseCategory = {
      category_id: null,
      category_name: 'Test-' + generateRandomString(8),
      icon,
      color: 'red'
    }

    await dao.addCategory(adminOID, baseCategory)

    const res = await db.ConnectAndQuery(
      `SELECT id FROM calendar.category WHERE name = '${baseCategory.category_name}'`
    )

    baseCategoryId = res.recordset[0].id
  })

  afterAll(async () => {
    const query = `
	  DELETE FROM calendar.category 
	  WHERE user_id = 
	    (SELECT id 
	    FROM calendar.app_user
	    WHERE active_directory_oid = '${adminOID}')`

    await db.ConnectAndQuery(query)
  })

  const createEvent = async (dateString: string) => {
    const handler = event

    const e = {
      event_date: dateString,
      event_description: 'this is the nightmail',
      category_id: baseCategoryId,
      event_id: null
    }

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            Authorization: adminToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify(e)
        })
        expect(res.status).toBe(200)
      }
    })

    const res = await db.ConnectAndQuery(
      `SELECT id FROM calendar.event 
       WHERE event_date = '${e.event_date}' 
       AND category_id = ${baseCategoryId} `
    )

    const id = res.recordset[0].id

    return {
      id: id,
      date: e.event_date,
      description: e.event_description,
      category_id: e.category_id
    }
  }

  it('test GET - /event', async () => {
    const handler = event

    // unauthenticated request
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(401)
      }
    })

    // authenticated request
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
          headers: { Authorization: nonAdminToken }
        })
        expect(res.status).toBe(200)
      }
    })
  })

  it('test POST - /event', async () => {
    const handler = event

    const categoryId = baseCategoryId

    const e = {
      event_date: '2006-01-02',
      event_description: 'this is the nightmail',
      category_id: categoryId,
      event_id: null
    }

    // unauthenticated request
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'POST', body: JSON.stringify(e) })
        expect(res.status).toBe(401)
      }
    })

    // non-admin authenticated request
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            Authorization: nonAdminToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify(e)
        })
        expect(res.status).toBe(401)
      }
    })

    // admin authenticated request
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            Authorization: adminToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify(e)
        })
        expect(res.status).toBe(200)
      }
    })

    // try to duplicate category
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            Authorization: adminToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify(e)
        })
        expect(res.status).toBe(409)
      }
    })
  })

  it('test PUT - /event/id', async () => {
    const handler = eventid

    const event = await createEvent('2000-01-02')

    const body = {
      event_date: event.date,
      event_description: "it's gonna rain",
      category_id: event.category_id
    }

    // unauthenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = event.id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { 'content-type': 'application/json' }
        })
        expect(res.status).toBe(401)
      }
    })

    // non-admin authenticate request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = event.id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            Authorization: nonAdminToken,
            'content-type': 'application/json'
          }
        })
        expect(res.status).toBe(401)
      }
    })

    // admin authenticate request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = event.id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            Authorization: adminToken,
            'content-type': 'application/json'
          }
        })
        expect(res.status).toBe(200)
      }
    })

    const putRes = await db.ConnectAndQuery(
      `SELECT event_description FROM calendar.event WHERE id = ${event.id}`
    )

    expect(putRes.recordset[0].event_description).toBe(body.event_description)
  })

  it('test DELETE - /event/id', async () => {
    const handler = eventid

    const event = await createEvent('2010-01-01')

    // unauthenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = event.id),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'DELETE' })
        expect(res.status).toBe(401)
      }
    })

    // non-admin authenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = event.id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          headers: { Authorization: nonAdminToken }
        })
        expect(res.status).toBe(401)
      }
    })

    // admin authenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = event.id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          headers: { Authorization: adminToken }
        })
        expect(res.status).toBe(200)
      }
    })

    const deleteRes = await db.ConnectAndQuery(
      `SELECT is_deleted AS deleted FROM calendar.event WHERE id = ${event.id}`
    )

    expect(deleteRes.recordset[0].deleted).toBe(true)
  })
})

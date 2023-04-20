import { NextApiHandler } from 'next'
import category from '../src/pages/api/category'
import categoryid from '../src/pages/api/category/[id]'
import { testApiHandler } from 'next-test-api-route-handler'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

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

describe('Test Category API endpoints', () => {
  let db: DatabaseConnector
  const nonAdminToken = `Bearer ${process.env.NON_ADMIN_JWT_TOKEN}`
  const adminToken = `Bearer ${process.env.ADMIN_JWT_TOKEN}`

  beforeAll(async () => {
    db = new DatabaseConnector()
  })

  afterAll(async () => {
    const query = `
    DELETE FROM calendar.category 
    WHERE user_id = 
      (SELECT id 
      FROM calendar.app_user
      WHERE active_directory_oid = '${process.env.ADMIN_OID}')`

    await db.ConnectAndQuery(query)
  })

  it('test GET - /category', async () => {
    const handler = category

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

  it('test POST - /category', async () => {
    const handler = category

    const category_name = 'Test' + generateRandomString(8)
    const color = 'red'
    const icon = 'CircleIcon'

    const body = {
      category_name,
      color,
      icon
    }

    // unauthenticated request
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'POST', body: body })
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
          body: JSON.stringify(body)
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
          body: JSON.stringify(body)
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
          body: JSON.stringify(body)
        })
        expect(res.status).toBe(409)
      }
    })
  })

  it('test PUT - /category/id', async () => {
    const handler = categoryid

    const categoryId = 374

    const category_name = 'Statutory Holiday'
    const color = 'red'
    const icon = 'CircleIcon'

    const body = {
      category_name,
      color,
      icon
    }

    // unauthenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = categoryId),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'PUT', body: body })
        expect(res.status).toBe(401)
      }
    })

    // non-admin authenticate request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = categoryId),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'PUT',
          body: body,
          headers: { Authorization: nonAdminToken }
        })
        expect(res.status).toBe(401)
      }
    })

    // admin authenticate request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = categoryId),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'PUT',
          body: body,
          headers: { Authorization: adminToken }
        })
        expect(res.status).toBe(200)
      }
    })
  })

  it.only('test DELETE - /category/id', async () => {
    const postHandler: NextApiHandler<any> = category
    const handler = categoryid

    const category_name = 'Test' + generateRandomString(8)

    // create a new category for use in tests
    await testApiHandler({
      handler: postHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            Authorization: adminToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            category_name,
            color: 'yellow',
            icon: 'CircleIcon'
          })
        })
        expect(res.status).toBe(200)
      }
    })

    const res = await db.ConnectAndQuery(
      `SELECT id FROM calendar.category WHERE name = '${category_name}'`
    )

    const categoryId = res.recordset[0].id

    // unauthenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = categoryId),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'DELETE' })
        expect(res.status).toBe(401)
      }
    })

    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = categoryId),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          headers: { Authorization: nonAdminToken }
        })
        expect(res.status).toBe(401)
      }
    })

    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = categoryId),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          headers: { Authorization: adminToken }
        })
        expect(res.status).toBe(200)
      }
    })

    const deleteRes = await db.ConnectAndQuery(
      `SELECT COUNT(*) AS count FROM calendar.category WHERE name = '${category_name}'`
    )

    expect(deleteRes.recordset[0].count).toBe(0)
  })
})

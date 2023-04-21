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

  const cleanUp = async (db: DatabaseConnector) => {
    const query = `
    DELETE FROM calendar.category 
    WHERE user_id = 
      (SELECT id 
      FROM calendar.app_user
      WHERE active_directory_oid = '${process.env.ADMIN_OID}')`

    await db.ConnectAndQuery(query)
  }

  beforeAll(async () => {
    db = new DatabaseConnector()
    await cleanUp(db)
  })

  afterAll(async () => {
    await cleanUp(db)
  })

  const createCategory = async () => {
    const postHandler: NextApiHandler<any> = category
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

    const id = res.recordset[0].id

    return {
      category_id: id,
      category_name,
      color: 'yellow',
      icon: 'CircleIcon'
    }
  }

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

    const category = await createCategory()

    const body = {
      category_name: category.category_name,
      color: 'orange',
      icon: category.icon
    }

    // unauthenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = category.category_id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body)
        })
        expect(res.status).toBe(401)
      }
    })

    // non-admin authenticate request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = category.category_id),
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
      paramsPatcher: (params) => (params.id = category.category_id),
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
      `SELECT color FROM calendar.category WHERE name = '${body.category_name}'`
    )

    expect(putRes.recordset[0].color).toBe(body.color)
  })

  it('test DELETE - /category/id', async () => {
    const handler = categoryid

    const category = await createCategory()

    // unauthenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = category.category_id),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'DELETE' })
        expect(res.status).toBe(401)
      }
    })

    // non-admin authenticated request
    await testApiHandler({
      handler,
      paramsPatcher: (params) => (params.id = category.category_id),
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
      paramsPatcher: (params) => (params.id = category.category_id),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          headers: { Authorization: adminToken }
        })
        expect(res.status).toBe(200)
      }
    })

    const deleteRes = await db.ConnectAndQuery(
      `SELECT COUNT(*) AS count FROM calendar.category WHERE name = '${category.category_name}'`
    )

    expect(deleteRes.recordset[0].count).toBe(0)
  })
})

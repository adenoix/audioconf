const chai = require('chai')
const crypto = require('crypto')
const db = require('../lib/db')

const utils = require("./utils")

/* global beforeEach describe */

describe('db', function() {
  beforeEach(async () => {
    await utils.reinitializeDB()
  })

  describe('loginTokens table', function() {
    it('should return the same dateString for conferenceDay that was inserted', async function() {
      const conferenceDayString = '2020-12-04'
      const token = crypto.randomBytes(256).toString("base64")
      const tokenExpirationDate = new Date()
      tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 60)

      await db.insertToken(
        'hello@blah.com',
        token,
        tokenExpirationDate,
        undefined, // conferenceDurationInMinutes
        conferenceDayString,
      )
      const fetchedTokens = await db.getToken(token)

      chai.assert.equal(fetchedTokens.length, 1)
      chai.assert.equal(fetchedTokens[0].conferenceDay, conferenceDayString)
      return Promise.resolve() // needed for async test
    })

  })
})

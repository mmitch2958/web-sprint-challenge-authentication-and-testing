const generateToken = require('./genToken.js');


describe('Generate Token', () => {
  describe('tests that function works as expected', () => {
    it('returns a token', async () => {
        const token = await generateToken({ username: 'name' });
        console.log(token)
//Used toBeTruthy as similar to == as i am looking for a string ( not an exact )
      expect(token).toBeTruthy();
    })
  })
})

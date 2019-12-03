// import twilio from 'twilio'

const testFrom = "+15005550006"
const To = "+77051871083" //A REAL NUMBER, is verified for trial account
const fromNumber = process.env.TWILIO_NUMBER || "+12012926732"
const sid = process.env.TWILIO_ACCOUNT_SID || "AC7e27e746c25bfa245a64cb3bc3a0f2ad"
const token = process.env.TWILIO_AUTH_TOKEN || "4e050a6bd95a951cbe41c16ef9019159"
const testSid = "AC1ba9d0b3b8fd8d26e0a2d247fc9202ce"
const testToken = "9f414740687863a6235ef46aeaf1fbf0"


Meteor.methods({
    //IMPORTANT: DONT MIX test credentials and numbers with "real" ones
    sendSMS: async function(outgoingMessage = "asdf", numbers = ["+77051871083"]) {
        if (this.isSimulation) {

        }
        else {
            const twilio = require('twilio')
            const Client = twilio(sid, token)
            const TestClient = twilio(testSid, testToken)
            const result = []

            if (Meteor.isProduction) {
                var fNum = fromNumber
                var client = Client
            }
            else { 
                var fNum = testFrom
                var client = TestClient
            }
            new Set(numbers).forEach(x => {
                result.push(
                    client.messages.create({
                        body: outgoingMessage,
                        from: fNum,
                        to: x
                    }).catch(console.log)
                )
            })
            const res = await Promise.all(result)
            //Don't just pass all fields of x, it will cause callstack errors
            return res.map(x=>x.status)
        }
    }
}) 

import twilio from 'twilio'

const testFrom = "+15005550006"
const testTo = "+77051871083" //A REAL NUMBER, is verified for trial account
const fromNumber = process.env.TWILIO_NUMBER || "+12012926732"
const sid = process.env.TWILIO_ACCOUNT_SID || "AC1ba9d0b3b8fd8d26e0a2d247fc9202ce"
const token = process.env.TWILIO_AUTH_TOKEN || "9f414740687863a6235ef46aeaf1fbf0"

const Client = twilio(sid, token)

Meteor.methods({
    sendSMS: function(outgoingMessage = "asdf", numbers = ["+5571981265131"]) {
        const result = []
        new Set(numbers).forEach(x => {
            result.push(
                Client.messages.create({
                body: outgoingMessage,
                from: testFrom,
                to: x
            }).then(mes =>mes).catch(console.log)
            )
        })
        return Promise.all(result).await()
    }
})

// Meteor.call('sendSMS', (err,res)=>{
//     console.log(err, res)
// })
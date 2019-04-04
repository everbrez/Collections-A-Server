import Counter from 'models/counter'
import config from 'config'

// init database
function init() {
  // check the counter for user
  Counter.findOne({ id: config.user.counter }, (err, userCounter) => {
    if (err) console.log(err.message)
    else {
      // if null, then create the counter
      // eslint-disable-next-line no-lonely-if
      if (!userCounter) {
        Counter.create({
          id: config.user.counter,
          value: config.user.defaultUserId - 1,
        },
        (error) => {
          if (error) console.log(err.message)
          else console.log('userCounter check successfully!')
        })
      } else {
        console.log('userCounter check successfully!')
      }
    }
  })
}

export default init

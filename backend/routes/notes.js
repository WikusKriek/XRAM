
const router = require('express').Router();
let Notes = require('../models/products.model');
const { Client } = require('tglib');

 async function chathistory() {
  const client = new Client({
    apiId: '1977632',
    apiHash: 'c82789d90135020d68a042d18806909a',
  })

  // Save tglib default handler which prompt input at console
 const defaultHandler = client.callbacks['td:getInput']

  // Register own callback for returning auth details
  client.registerCallback('td:getInput', async (args) => {
    if (args.string === 'tglib.input.AuthorizationType') {
      return 'user'
    } else if (args.string === 'tglib.input.AuthorizationValue') {
      return '+27832743002'
    }
    return await defaultHandler(args)
  })

  await client.ready

  const result = await client.fetch({
    '@type': 'getChatHistory',
    'chat_id': '-1001431029998',
    'from_message_id': 1,
    'offset': -30,
    'limit': 100,
    'only_local':false
  })
  await client._destroy()
  // latest 100 chat id will be returned
  return(result)
}

async function chats() {
  const client = new Client({
    apiId: '1977632',
    apiHash: 'c82789d90135020d68a042d18806909a',
  })

  // Save tglib default handler which prompt input at console
 const defaultHandler = client.callbacks['td:getInput']

  // Register own callback for returning auth details
  client.registerCallback('td:getInput', async (args) => {
    if (args.string === 'tglib.input.AuthorizationType') {
      return 'user'
    } else if (args.string === 'tglib.input.AuthorizationValue') {
      return '+27832743002'
    }
    return await defaultHandler(args)
  })

  await client.ready

  const result = await client.fetch({
    '@type': 'getChats',
    'offset_order': '9223372036854775807',
    'offset_chat_id': 0,
    'limit': 100,
  })
  await client._destroy()
  // latest 100 chat id will be returned
  return(result)
}

void async function() {
  const client = new Client({
    apiId: 'YOUR_API_ID',
    apiHash: 'YOUR_API_HASH',
  })

  // Save tglib default handler which prompt input at console
  const defaultHandler = client.callbacks['td:getInput']

  // Register own callback for returning auth details
  client.registerCallback('td:getInput', async (args) => {
    if (args.string === 'tglib.input.AuthorizationType') {
      return 'user'
    } else if (args.string === 'tglib.input.AuthorizationValue') {
      return 'YOUR_INTERNATIONAL_PHONE_NUMBER'
    }
    return await defaultHandler(args)
  })

  await client.ready

  await client._send({
    '@type': 'sendMessage',
    'chat_id': -123456789,
    'input_message_content': {
      '@type': 'inputMessageText',
      'text': {
        '@type': 'formattedText',
        'text': 'Hi',
      },
    },
  })

  // or use tglib API
  await client.tg.sendTextMessage({
    '$text': new Structs.TextStruct('<b>Hi bold</b>', 'textParseModeHTML'),
    'chat_id': -123456789,
  })
}()
 
router.route('/').get((req, res) => {

chathistory()
.then(chats => res.json(chats))
.catch(err => res.status(400).json('Error: ' + err));
 

    
});

router.route('/view').get((req, res) => {

  chathistory()
  .then(chats =>{
    var chats2=[]
    chats.messages.forEach(val => {
      if(val.content['@type']=='messagePoll'){
      console.log(val.content.poll.question)
      var message={
        textContent: val.content.poll.question,
        time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
        isSent: true,
        isSeen: true
      }
      chats2.push(message)
    }
    if(val.content['@type']=='messageText'){
      console.log(val.content.text.text)
      var message={
        textContent: val.content.text.text,
        time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
        isSent: true,
        isSeen: true
      }
      chats2.push(message)
    }
     });
    var contacts={contacts:[{uid: 1,
      displayName: "XRAM-DEMO",
      about:
      "Chat for XRAM related questions",
      photoURL: 'https://www.xramtech.com/wp-content/uploads/2018/03/logo.png',
      status: "offline"}]}
      var data={contacts:[{uid: 1,
        displayName: "XRAM-DEMO",
        about:
        "Chat for XRAM related questions",
        photoURL: 'https://www.xramtech.com/wp-content/uploads/2018/03/logo.png',
        status: "offline"}],chats:{
          1:{
            isPinned: true,
      msg:chats2
          }
        }}
        res.json(data)   
  } )
  .catch(err => res.status(400).json('Error: ' + err));
   
  
      
  });

router.route('/piechart').get((req, res) => {
  chathistory()
  .then(chats =>{
    var chats2=[]
    chats.messages.forEach(val => {
      if(val.content['@type']=='messagePoll'){
      
      
      chats2.push(val.content.poll)
    }
    
     });
     console.log(chats2);
        res.json(chats2)   
  } )
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/chats').get((req, res) => {
  chats()
  .then(chats =>{
    
     console.log(chats);
        res.json(chats)   
  } )
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/barchart').get((req, res) => {
  chathistory()
  .then(chats =>{
    var chats2=[]
    chats.messages.forEach(val => {
      
      if(val.content['@type']=='messagePoll'){
      if(val.content.poll.type['@type']=='pollTypeQuiz'){
      
      
      chats2.push(val.content.poll)
    }
    
     }});
     var data1=[]
     var data2=[]
     var data3=[]
     var data4=[]
     var labels=[]
     chats2.forEach(val => {
      console.log(val)
      
      var totalwrong=0;
      var totalright=0;
        for (var key in val.options) {
          console.log(val.options[key].voter_count)
        if(key==val.type.correct_option_id){
          totalright=totalright+val.options[key].voter_count;
        } else{
          totalwrong=totalwrong+val.options[key].voter_count;
        }
      }
       data4.push({name:val.question,total:val.total_voter_count,right:totalright,wrong:totalwrong})
      data1.push(val.total_voter_count)
      data2.push(totalright)
      data3.push(totalwrong)
      labels.push(val.question)
      
     })
     var results={total:data1,right:data2,wrong:data3,labels:labels}
        res.json(data4)   
  } )
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/table').get((req, res) => {
  chathistory()
  .then(chats =>{
    var chats2=[]
    var chats1=[]
    chats.messages.forEach(val => {
      
      if(val.content['@type']=='messagePoll'){
      if(val.content.poll.type['@type']=='pollTypeQuiz'){
      
      
      chats2.push(val)
    }
    }
     
    });
    chats2.forEach(val => {
      chats1.push({
        "type": val.content['@type'],
        "id": val.id,
        "sender_user_id": val.sender_user_id,
        "chat_id": val.chat_id,
        "is_outgoing": val.is_outgoing,
        "can_be_edited": val.can_be_edited,
        "can_be_forwarded": val.can_be_forwarded,
        "question":val.content.poll.question,
        "views":val.views,
        "voter_count":val.content.poll.total_voter_count,
        "is_anonymous":val.content.poll.is_anonymous,
        "quiz_type":val.content.poll.type['@type'],
        "correct_option_id":val.content.poll.type.correct_option_id


      })
    })

        res.json(chats1)   
  } )
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/send').post((req, res) => {
  const {contactId,message,isPinned}=req.body;
});
module.exports = router;
import axios from 'axios';

export default function SmsMarketing() {
  return (
    <div><button className='btn btn-success' onClick={handleSubmit}>click me</button></div>
  )
}
const handleSubmit=async()=>{
const options = {
    method: 'GET',
    url: 'https://branded-sms-pakistan.p.rapidapi.com/send',
    params: {
      message: 'Hello I am sending test message',
      email: 'hello@brandedsmspakistan.com',
      key: '6014c421fd3dc1185d2b0603b41',
      mask: 'H3 TEST SMS',
      to: '923046066107, 923177032194'
    },
    headers: {
      'X-RapidAPI-Key': '4bb2968332msh1df075c45e70830p1d6c1ajsnb2d5a13619dc',
      'X-RapidAPI-Host': 'branded-sms-pakistan.p.rapidapi.com'
    }
  };

  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }}

import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use('/assets', express.static('public/assets'))
const items = [
  { id:1, title:'Influencore Hero', description:'Branded hero image', image:'http://localhost:5000/assets/hero-1.png' },
  { id:2, title:'Influencore Media', description:'Sample video and audio', image:'http://localhost:5000/assets/hero-1.png', video:'http://localhost:5000/assets/video-sample.webm', audio:'http://localhost:5000/assets/voice-sample.mp3' }
]
app.get('/api/items', (_,res)=>res.json(items))
app.listen(5000, ()=> console.log('Mock API on 5000'))

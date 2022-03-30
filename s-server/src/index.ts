import api from './api'
import express from 'express'

const app = express()

app.listen(9000)

api.commodity.all()

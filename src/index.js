const express = require("express")
const app = express()

const joi = require("joi")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res)=>{
    res.json({
        mensaje:"estas en la raiz"
    })
})

app.post("/validacion", async (req, res)=>{
    try{
        let datos = req.body
        console.log(datos)

        //creamos el esquema de validacion
        const schema = joi.object({
            user: joi
                .string()
                .email({minDomainSegments: 2, tlds: {allow:["com", "net"]}})
                .required(),
            pass: joi
            .string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        })

        const value = await schema.validateAsync(datos)


        res.json({
            value,
            mensaje:"validacion correcta"
        })
    }catch(err){
        res.json({error: "error en la validacion "+err})
    }
})


const PORT = 8080
app.listen(PORT, ()=>{
    console.log("estas en el puerto "+PORT)
})
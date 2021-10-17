/*jshint esversion: 8 */
const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

//************* Conexion ************************
const DB_URI = "mongodb://localhost/mongo_node_course";

mongoose.connect(DB_URI)
    .then( (db)=>{
        console.log("Connection database is sucessfull !!");
    })
    .catch( (err)=>{
        console.log(err);
    });

//****************** Modelos ********************//

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    numberPhone: {
        type:Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});


// ***** type:Schema.Types.ObjectId ****** 
//**** Hace referencia va hacer de typo id de mongo db ***//
// ! quiere decir que solo se podran guardar objetos de tipo: 
// !_id que es el tipo de id que usa mongo */
const publishSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    author:{
        type:Schema.Types.ObjectId
    }
},{
    timestamps: true,
    versionKey:false
});

const categorySchema = new Schema({
    name: {
        type:String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

// **** Modelos *****//
const Users = mongoose.model("users",userSchema); //! users va hacer el nombre de la coleccion
const Published = mongoose.model("publish",publishSchema); //! publish va hacer el nombre de la coleccion
const Category = mongoose.model("category",categorySchema);

//*********** CRUD de datos ************//

//? insert //
const createUser = () => { 
    Users.create({
    name: "yuyu",
    email: "yuyu@gmail.com",
    numberPhone: "55555"
});
};
// createUser(); //!llamar a la funcion

//? insertar varios registros con insertMany
//? insertar el type:Schema.Types.ObjectId

const createPublish = ()=>{
    const list = [
        {
            title: "Mi post!",
            description: "first post description",
            author: '616662fedb763915e68316ed'
        },
        {
            title: "Mi second post!",
            description: "second post description",
            author: '616662fedb763915e68316ed'
        }];

    Published.insertMany(list);
};
//createPublish(); //!llamar a la funcion
const createCategory = ()=>{
    const list = [
        {
            name: "Salud"
        },
        {
            name: "Tecnologia"
        }
    ];

    Category.insertMany(list);
};

//createCategory(); //!llamar a la funcion

//****** Buscar usuario por id *******/
//? usando then y catch para ver lo errores
//! todas las funciones de moongose (findById,insertMany,etc.) son promesas
//! es decir que se les puede agregar el then catch 
const findById = async ()=>{
    await Users.findById('616662fedb763915e68316ed')
    .then((findUSer)=>{
        console.log(findUSer);
    })
    .catch( (error)=>{
        console.log(error);
    });
    //console.log(findUser);
};

// findById(); //!llamar a la funcion

//****** Buscar por coincidencia *****/
//? busca por el valor que queramos 
//! si hasy mas de un valor igual solo trae el primero que encuentre
const findOne = async ()=>{
   const post = await Published.findOne({
        title: "Mi second post!"
    });
    console.log(post);
};

//findOne(); //!llamar a la funcion

//***** Buscar todos*****/
//? arroja todos los resultados de las coincicencias
//! si se usan find() trae todos los registros
const find = async ()=>{
    const post = await Published.find({
         author: '616662fedb763915e68316ed'
     });
     console.log(post);
 };

//find(); //!llamar funcion


//****Busca y si no encuentra lo crea */
//? en el primer argumento se pone lo que se va  abuscar
//? en el segundo argumento va lo que se va a insertar 
//? en caso de que no encuentre coincidencias con el primer parametro
const buscarOCrear = async () => {
    const post = await Published.findOneAndUpdate(
        {
            title: '50 cosas sobre mi'
        },
        {
            description: 'Hola aqui me genere automaticamente',
            author: '61665489c3d128d579578edd'
        },
        {
            new: true,
            upsert: true
        });

    console.log(post);
};

//buscarOCrear(); //!llamar funcion


//****Editar la primera coincidencia */
//? en el primer argumento se pone lo que se va  abuscar
//? en el segundo argumento va lo que se va a editar

//! ********** marca error (editarPublicacion)***********
//!hace la funcion pero marca error 
//! UnhandledPromiseRejectionWarning: MongooseError: 
//! Query was already executed: publish.updateOne({ title: '50 cosas sobre mi' }


const editarPublicacion = async () => {
    const resultado = await Published.updateOne(
        {
            title:'50 cosas sobre mi'
        },
        {
            title: 'EDITADO (HOLA cosas)',
            description: ' EDITADO Nueva descripcion'
        },
        (err) => {
              //console.log('*** ERRROR ***', err);
        }
    );

    console.log(resultado);
};

//editarPublicacion(); //!llamar funcion


//******* elimina un registro *********/
const borrarPost = async () => {
    const resultado = await Published.deleteOne(
        {
            _id: '61673b701653ef864f959ee2'
        }
    );

    console.log(resultado);
};

//borrarPost(); //!llamar funcion


//******** se usa la tabla publish por que es la padre ******/
//? la tabla publish es la padre por que tiene el id del autor (users)
const publicacionConUsuario = async () => {

    //** 1 - Publicaciones ---> 
    const resultado = await Published.aggregate(
        [
            {
                //? loohup es el filtrado de documentos "joined"
                //? joined => que tienen una relacion
                $lookup:
                {
                    from: "users", //! users es el nombre de la coleccion (tabla) 
                    localField: "author", //! campo que referencia publishes con users
                    //! author tiene el id de users
                    foreignField: "_id", //! checara que el campo de localField (author)
                    //! conincida con el foreignField (id) de users ()se definio en users
                    as: "usuarioAuthor" //! alias
                }
            },
            { $unwind: "$usuarioAuthor" }, //? sirve para convertir el array de lookup 
            //? y retorna un solo objeto
            { $match: { title: "Mi post!" } } //? filtra lo que quieras de la coleccion publish
            
        ]
    );

    console.log( resultado);

};

//publicacionConUsuario(); //!llamar funcion



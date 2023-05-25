const express = require('express');
const path = require('path')
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const multer =require('multer');
const DirName=require('./util/path');
const sequelize=require('./util/db')
const session=require('express-session');
const Magazinier_gct =require('./models/magazinier');
const Technicien_gct =require('./models/technicien');
const Chef_gct=require('./models/chef_Service');
const spare_parts=require('./models/spare_part');
const department=require('./models/department');
const agent_supplier=require('./models/agent_supplier');
const equipment=require('./models/equipment');
const work_order=require('./models/work_order');
const break_down=require('./models/break_down');
const dialy_inspection=require('./models/dialy_inspection');
const ppm_questions=require('./models/ppm_questions')
const ppm=require('./models/ppm')
const PB=require('./models/problems');
const maintenance=require('./models/maintenance');
const homeController=require('./routes/main');
const addController=require('./routes/add');
const deleteController=require('./routes/delete')
const editController=require('./routes/edit')
const reportController=require('./routes/report')




const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`💬 server on port ${PORT}`))
const io = require('socket.io')(server)
let socketsConected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  console.log('Socket connected', socket.id)
  socketsConected.add(socket.id)
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}
const filestorage =multer.diskStorage ({
  destination:(req,file,cb) => {
    cb(null,'public/images');
  },
  filename:(req,file,cb) => {
    cb(null,'image'+'_'+file.originalname);
  }
})
const filefilter = ( req ,file,cb) => {
if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'  )
{
  cb(null,true);
} else{
 cb(null,false);
}
}

app.use(multer({storage:filestorage,fileFilter:filefilter}).single('image'));

app.use(session({secret:'anysecret',resave:false,saveUninitialized:false}));
app.use(express.static(DirName+'/public/'));
app.engine('handlebars', exphbs({layoutsDir:'views/layouts/',defaultLayout:'admin-Layout',partialsDir:'views/includes/'}));
app.set('view engine', 'handlebars');
app.set('views','views');



//app.use(multer({dest:'images/'}).single('image'))
app.use(reportController);
app.use(editController);
app.use(deleteController);
app.use(addController);
app.use(homeController);
app.use((req,res)=>{
  res.render('error',{layout:false,href:'/',pageTitle:'404 Error',message:'404 Sorry !!! Could Not Get This Page'})
})


ppm_questions.belongsTo(equipment,{foreignKey:'EquipmentCode'})
equipment.hasOne(ppm_questions,{foreignKey:'EquipmentCode'})

Chef_gct.belongsTo(department,{foreignKey:'DepartmentCode'})
department.hasMany(Chef_gct,{foreignKey:'DepartmentCode'});

Technicien_gct.belongsTo(department,{foreignKey:'DepartmentCode'})
department.hasMany(Technicien_gct,{foreignKey:'DepartmentCode'});

Magazinier_gct.belongsTo(department,{foreignKey:'DepartmentCode'})
department.hasMany(Magazinier_gct,{foreignKey:'DepartmentCode'});

work_order.belongsTo(Technicien_gct);
Technicien_gct.hasMany(work_order);
spare_parts.belongsTo(agent_supplier);
agent_supplier.hasMany(spare_parts);
equipment.belongsTo(agent_supplier);
agent_supplier.hasMany(equipment);
equipment.belongsTo(department);
department.hasMany(equipment);

work_order.belongsTo(equipment);
equipment.hasMany(work_order);
break_down.belongsTo(equipment);
equipment.hasMany(break_down);
maintenance.belongsTo(break_down);
break_down.hasMany(maintenance);
dialy_inspection.belongsTo(equipment);
equipment.hasMany(dialy_inspection);
dialy_inspection.belongsTo(Technicien_gct);
Technicien_gct.hasMany(dialy_inspection)
ppm.belongsTo(equipment,{foreignKey:'EquipmentCode'});
equipment.hasMany(ppm,{foreignKey:'EquipmentCode'});
ppm.belongsTo(Technicien_gct);
Technicien_gct.hasMany(ppm)
maintenance.belongsTo(Technicien_gct)
Technicien_gct.hasMany(maintenance)
spare_parts.belongsTo(equipment)
equipment.hasMany(spare_parts)

PB.belongsTo(equipment,{foreignKey:'EquipmentCode'});
equipment.hasMany(PB,{foreignKey:'EquipmentCode'});
PB.belongsTo(Technicien_gct);
Technicien_gct.hasMany(PB)

maintenance.belongsTo(spare_parts);
spare_parts.hasMany(maintenance);

// synchronizing with database 
sequelize.sync({force:false})
//sequelize.sync({force:false})
.then(res => {
    app.listen(5000,() => {
        console.log('YES')
       })
      
    })
    .catch(err => {
      console.log("err:" ,err);
    })


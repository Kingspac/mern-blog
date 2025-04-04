const mongoose = require('mo.mongoose');
const {schema,model} = mongoose;
const userSchema = new schema({
  username:{
    type:string,
    require:true,
    min:4, 
    unique:true
},
password:{
  type:string
  require:true
}
});

const userModel = model('user', userSchema);

module.exports = userModel;
const cloudinary = require("cloudinary").v2;
        
cloudinary.config({ 
  cloud_name: 'dpghn4ret', 
  api_key: '821675255459345', 
  api_secret: 'ijTUA778oTcaG1kwsZIZk60Ad8U' 
});

module.exports = cloudinary;
const Module = require('./lib.js')

Module.onRuntimeInitialized = () => {
    Module.ccall('myFunction', // name of C function 
        null, // return type
        null, // argument types
        null // arguments
   );
}
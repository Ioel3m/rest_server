process.env.PORT = process.env.PORT || 3001;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost/cafe'
// } else {
//     urlDB = 'mongodb://user-cafe:cafe1234@ds143163.mlab.com:43163/cafe'
// }

urlDB = 'mongodb://user-cafe:cafe1234@ds143163.mlab.com:43163/cafe'
process.env.URLDB = urlDB
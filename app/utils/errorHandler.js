const errorHandler = (err, res) => {
    // error handling
    console.error(err);

    res.status(500).json({ message: 'Internal Server Error' });
  };
  
  module.exports = { errorHandler };
  
function oneCall (callback) {
    let called = false;
  
    return (...args) => {
      if (!called) {
        called = true;
        return callback(...args);
      }
    };
  }

export default oneCall

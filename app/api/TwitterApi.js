export const test = (test) => {
  return new Promise((resolve, reject) => {
      if(test){
        setTimeout(function(){
          resolve(test);
        }, 2500);
      }else {
        reject('Error');
      }
    });
}
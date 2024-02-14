
export function generate(){
   let ans =  Date.now().toString(36) + Math.random().toString(36).substring(2, 4);

   console.log(ans);
   return ans;
}
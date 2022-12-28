export const checkCorrectJSON = (body: string) => {
    try{
        JSON.parse(body);
     }catch (e){
        return false;
     }
   
    return true;
}
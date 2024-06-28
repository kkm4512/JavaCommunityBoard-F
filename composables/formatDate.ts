export function formatDate(date:string){
  const yymmdd = date.split("T")[0];
  const time = date.split("T")[1].split(".")[0];
  return yymmdd + " " +  time;
}
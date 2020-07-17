import { Application,Router } from "https://deno.land/x/oak/mod.ts";



//models.ts
interface Players{
    name : string,
    role : string,
    salary : number,
    active : boolean

}

//data.ts
let players : Array<Players> = [
    {
        name:"Rohit Sharma",
        role:"Batsman",
        salary:34000,
        active:true
    },
    {
        name:"Virat Kohli",
        role:"Batsman",
        salary:54000,
        active:true},
    {
        name:"Virendar Sehwag",
        role:"Batsman",
        salary:14000,
        active:false
    }

];

//controllers.ts
//#1
export const getPlayers = ({response} : {response:any}) => {
    //players array
    response.body = players;

}
//#2:async function:Not Working Properly
export const addPlayers = async ({request,response} : {request:any,response:any}) => 
{
   const body = await request.body();
   //Single Course sent as a body
   const player :  Players = body.value;
   //Pushing Player to Players Array
   players.push(player)
   response.body = {
       playersAdded : "SUCCESS"
   }
   response.status = 200;

}
//server.ts

//TypeScript import
const router = new Router();
const app = new Application();


router
    .get("/players",getPlayers)
    .post("/add",addPlayers);

//mandatory middlewares
app.use(router.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
    ctx.response.body = "2nd Page";
});

await app.listen({ port: 4300 });




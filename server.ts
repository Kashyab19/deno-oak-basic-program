import {serve} from "https://deno.land/std@0.61.0/http/server.ts";

const s = serve({
    port: 4300
});

console.log("Running on 4300");

for await(const req of s){
    req.respond({
        body:"<h1>Hello Deno World</h2>"
    })
}
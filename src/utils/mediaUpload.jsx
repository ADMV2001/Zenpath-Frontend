import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbGdscGhneGdwYWZyc2Vuem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MzA0MjEsImV4cCI6MjA2MTMwNjQyMX0.fD3tzlLS5iZMn7VQSANXB7zMLtN9f_Fpia6oYSprK2c"
const supabase_url = "https://nolglphgxgpafrsenzmn.supabase.co"

const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file){

    return new Promise((resolve, reject)=>{
        if(!file){
            return reject("File not selected")
        }

        const timeStamp = new Date().getTime()
        const fileName = timeStamp + file.name

        supabase.storage.from("therapistprofilepicture").upload(fileName, file,{
            cacheControl : '3600',
            upsert : false
        }).then(()=>{
            const public_url = supabase.storage.from("therapistprofilepicture").getPublicUrl(fileName).data.publicUrl;
            console.log(public_url);
            resolve(public_url);

        }).catch(()=>{
            reject("Error uploading file");
        })

    })   
}
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation' 
import { createClient } from '../../../utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = createClient() 
     
    const userdata = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,  
    }
  
    const { data, error } = await supabase.auth.signUp(userdata)
  
    if (error) {
        console.log(error)
        redirect('/error')
    }
 
    if(data.user){
      const id = data.user.id;
      const email = data.user.email;
      const username = formData.get('username') as string;
      const {error } = await supabase
      .from('users')
      .insert({id, username, email });

      if(error){
        console.log(error)
      }
    }
    
    revalidatePath('/', 'layout')
    redirect('/login')
  }


  export async function gotoSignIn(){
    redirect("/login");
  }
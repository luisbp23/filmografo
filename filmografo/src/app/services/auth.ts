import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
  
  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }
  
  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }
  
  signOut() {
    return this.supabase.auth.signOut();
  }
  
  getSession() {
    return this.supabase.auth.getSession();
  }
  
  onAuthChange(callback: (session: any) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
  get supabaseClient() {
    return this.supabase;
  }
  
  async getUserRole(): Promise<string> {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return 'user';
    
    const { data } = await this.supabase
    .from('user')
    .select('role')
    .eq('id', user.id)
    .single();
    
    return data?.role ?? 'user';
  }
}